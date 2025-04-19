const Profile = require("../models/Profile");
const { fetchProgramsByGenreAndType, fetchTmdbDetails } = require("../utils/tmdbUtils");

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const genreMap = {
  action: 28,
  adventure: 12,
  animation: 16,
  comedy: 35,
  crime: 80,
  documentary: 99,
  drama: 18,
  family: 10751,
  fantasy: 14,
  history: 36,
  horror: 27,
  music: 10402,
  mystery: 9648,
  romance: 10749,
  "sci-fi": 878,
  thriller: 53,
  war: 10752,
  western: 37,
};

async function getPersonalizedRecommendations(profileId) {
  const profile = await Profile.findById(profileId);

  if (!profile || !profile.userHistory || profile.userHistory.length === 0) {
    return [];
  }

  const uniqueHistory = [
    ...new Map(profile.userHistory.map((item) => [`${item.programId}-${item.type}`, item])).values()
  ];

  const limitedHistory = uniqueHistory.slice(0, 30);

  const enrichedHistory = await Promise.all(
    limitedHistory.map(async (item) => {
      try {
        const tmdb = await fetchTmdbDetails(item.programId, item.type);
        return `• ${item.action.toUpperCase()}: ${tmdb.title || tmdb.name} (${item.type}) - genres: ${tmdb.genres.map((g) => g.name).join(", ")} - overview: ${(tmdb.overview || "").slice(0, 200)}...`;
      } catch (err) {
        console.warn(`Failed to fetch TMDB for ${item.programId} (${item.type}): ${err.message}`);
        return null;
      }
    })
  );
  const historyText = enrichedHistory.filter(Boolean).join("\n");

  prompt = `You are a smart AI recommendation engine helping a streaming platform. 
  You analyze user behavior data (clicks and likes) to infer viewing preferences and suggest content accordingly.
  Each item in the user's activity log contains:
  - a programId (a TMDB ID),
  - an action (either "click" or "like"),
  - a timestamp,
  - a type (either "movie" or "tv").
  
  Your job is to:
  1. Infer which **genres** the user might prefer (e.g., "action", "drama", "comedy"), based on frequency or pattern of interaction.
  2. Identify preferred **types**: do they engage more with movies, TV, or both?
  3. Optionally extract any **keywords or themes** that seem recurring (e.g., "crime", "supernatural", "romance").
  4. Output a JSON with fields: genres, types, keywords, and optionally confidence and data_quality (e.g., "low", "medium", "high").
  
  Avoid vague answers. Even with limited data, make educated guesses and infer partial preferences based on interaction frequency, type bias, or time proximity of similar items.
  Here is the user activity:
  ${historyText}
  
  Output: JSON object only with no explanation or preamble.`

  let preferences;
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();

    const jsonText = responseText.match(/\{[\s\S]*\}/)?.[0];
    preferences = JSON.parse(jsonText);
  } catch (e) {
    if (err.status === 429 || err.message?.includes("quota")) {
    console.warn("Gemini quota exceeded — returning fallback preferences.");
    preferences = {
      genres: ["action"],
      types: ["movie"],
      keywords: ["popular"],
      confidence: "low",
      data_quality: "fallback"
    };
    await Log.create({
      user: profile.user,
      action: "Used Gemini Fallback",
      level: "warning",
      details: {
        reason: "quota_exceeded",
        profileId,
        fallback: preferences
      },
    });
  } else {
    console.error("Error using Gemini:", err);
    return [];
  }
}

  const genreKey = preferences.genres?.[0]?.toLowerCase();
  const tmdbGenreId = genreMap[genreKey] || 28;
  const type = preferences.types?.[0] || "movie";

  const results = await fetchProgramsByGenreAndType(type, tmdbGenreId);
  return results.slice(0, 10);
}

const getRecommendations = async (req, res) => {
  try {
    const { profileId } = req.query;
    if (!profileId) return res.status(400).json({ error: "Missing userId" });

    const results = await getPersonalizedRecommendations(profileId);
    res.json(results);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Failed to generate recommendations" });
  }
};

module.exports = { getPersonalizedRecommendations, getRecommendations };