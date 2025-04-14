const use = require("@tensorflow-models/universal-sentence-encoder");
const tf = require("@tensorflow/tfjs-node");
const Profile = require("../models/Profile");
const axios = require("axios");
const TMDB_API_KEY = process.env.TMDB_API_KEY;

let modelPromise = null;
const loadModel = async () => {
  if (!modelPromise) modelPromise = use.load();
  return modelPromise;
};

exports.getRecommendations = async (req, res) => {
  try {
    const { userId, limit = 10 } = req.query;
    if (!userId) return res.status(400).json({ error: "Missing userId" });

    const profile = await Profile.findOne({ user: userId });
    if (!profile || !profile.userHistory || profile.userHistory.length === 0) {
      return res.status(200).json([]);
    }

    const history = profile.userHistory.slice(-20);
    const details = await Promise.all(
      history.map(async ({ programId, type }) => {
        try {
          const data = await getTmdbDetailsPreviewInternal(programId, type);
          return data && data.overview ? data.overview : null;
        } catch (err) {
          return null;
        }
      })
    );

    const validDescriptions = details.filter(Boolean);
    if (validDescriptions.length === 0) return res.status(200).json([]);

    const model = await loadModel();

    const userEmbeddings = await model.embed(validDescriptions);
    const userEmbeddingAvg = tf.mean(userEmbeddings, 0, true);

    const trendingPrograms = await getTmdbTrendingPrograms(); 
    const descriptions = trendingPrograms.map(p => p.overview || "");
    const programEmbeddings = await model.embed(descriptions);

    const similarities = tf.matMul(programEmbeddings, userEmbeddingAvg, false, true);
    const scores = similarities.arraySync().map((val, i) => ({
      ...trendingPrograms[i],
      score: val[0],
    }));

    const top = scores
      .filter(p => !!p.overview)
      .sort((a, b) => b.score - a.score)
      .slice(0, Number(limit));

    res.json(top);
  } catch (err) {
    console.error("Recommendation error:", err);
    res.status(500).json({ error: "Failed to generate recommendations" });
  }
};

async function getTmdbDetailsPreviewInternal(tmdbId, type) {
  const response = await axios.get(`https://api.themoviedb.org/3/${type}/${tmdbId}`, {
    params: {
      api_key: TMDB_API_KEY,
      language: "en-US",
    },
  });
  return {
    id: response.data.id,
    type,
    title: response.data.title || response.data.name,
    overview: response.data.overview,
    posterPath: response.data.poster_path,
  };
}

async function getTmdbTrendingPrograms() {
  const response = await axios.get(`https://api.themoviedb.org/3/trending/all/week`, {
    params: {
      api_key: TMDB_API_KEY,
      language: "en-US",
    },
  });

  return response.data.results.map(p => ({
    id: p.id,
    type: p.media_type,
    title: p.title || p.name,
    overview: p.overview,
    posterPath: p.poster_path,
  }));
}
