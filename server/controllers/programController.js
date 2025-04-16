const axios = require("axios");
require("dotenv").config();
const Program = require("../models/Program");
const Review = require("../models/Review");
const MyList = require("../models/MyList");
const Log = require("../models/Log");
const { getPersonalizedRecommendations } = require("./recommendationController");
const { fetchProgramsByGenreAndType, getTMDBImageUrl } = require("../utils/tmdbUtils");
const { getTopWatchedInIsrael } = require("../utils/tmdbService");

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// ========== UTILS ========== //
const tmdbRequest = async (endpoint, params = {}) => {
  const url = `${TMDB_BASE_URL}${endpoint}`;
  const config = {
    params: {
      api_key: TMDB_API_KEY,
      language: "en-US",
      page: 1,
      ...params,
    },
  };
  const response = await axios.get(url, config);
  return response.data.results || response.data;
};

const mapImageUrls = (programs) =>
  programs.map((p) => ({
    ...p,
    posterPath: getTMDBImageUrl(p.poster_path || p.posterPath, "w500"),
    backdropPath: getTMDBImageUrl(p.backdrop_path || p.backdropPath, "w780"),
}));

const filterWithImage = (items) =>
  items.filter((item) => item.poster_path || item.backdrop_path || item.posterPath || item.backdropPath);

// ========== HOMEPAGE ROWS ========== //
const getHomepageContent = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const type = req.query.type; // "movie", "tv", or undefined
    const genre = req.query.genre || 28;

    const programFilter = type ? { type } : {};

    const [
      personalizedRaw,
      newestMovie,
      newestTV,
      mostWatchedRaw,
      recentReviewsRaw,
      topRatedRaw,
      animatedMovie,
      animatedTV,
      customMovie,
      customTV,
      myListRaw,
    ] = await Promise.all([
      getPersonalizedRecommendations(userId),
      type !== "tv" ? tmdbRequest("/discover/movie", { sort_by: "release_date.desc" }) : [],
      type !== "movie" ? tmdbRequest("/discover/tv", { sort_by: "first_air_date.desc" }) : [],
      getTopWatchedInIsrael(15),
      Review.find({ user: userId }).sort({ createdAt: -1 }).limit(10),
      Program.find(programFilter).sort({ averageRating: -1 }).limit(10),
      type !== "tv" ? tmdbRequest("/discover/movie", { with_genres: 16 }) : [],
      type !== "movie" ? tmdbRequest("/discover/tv", { with_genres: 16 }) : [],
      type !== "tv"
        ? tmdbRequest("/discover/movie", { with_genres: genre })
        : [],
      type !== "movie"
        ? tmdbRequest("/discover/tv", { with_genres: genre })
        : [],
      MyList.find({ user: userId }).sort({ createdAt: -1 }).limit(10),
    ]);

    const newest = filterWithImage([...newestMovie, ...newestTV]).slice(0, 10);
    const animated = filterWithImage([...animatedMovie, ...animatedTV]).slice(0, 10);
    const custom = filterWithImage([...customMovie, ...customTV]).slice(0, 10);

    const mostWatched = mapImageUrls(filterWithImage(mostWatchedRaw)).slice(0, 10);
    const topRated = mapImageUrls(filterWithImage(topRatedRaw)).slice(0, 10);
    const personalized = mapImageUrls(filterWithImage(personalizedRaw)).slice(0, 10);

    const recentReviews = recentReviewsRaw.map((review) => ({
      ...review.toObject(),
      program: mapImageUrls(filterWithImage([review.program]))[0],
    }));

    const myList = myListRaw.map((item) => ({
      ...item.toObject(),
      program: mapImageUrls(filterWithImage([item.program]))[0],
    }));

    await Log.create({
      action: "Fetched Homepage Content",
      user: userId,
    });

    res.json({
      personalized,
      newest: mapImageUrls(newest),
      mostWatched,
      recentReviews,
      topRated,
      animated: mapImageUrls(animated),
      custom: mapImageUrls(custom),
      myList,
    });
  } catch (err) {
    console.error("Error in getHomepageContent:", err);
    next(err);
  }
};

// ========== PROGRAM DETAILS ========== //
const getProgramDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("📥 Requested Program ID:", id);

    let program = await Program.findById(id);
    if (!program) {
      program =
        (await tmdbRequest(`/tv/${id}`)) || (await tmdbRequest(`/movie/${id}`));
    }

    res.json(program);
  } catch (err) {
    // next(err);
    console.error("❌ getProgramDetails failed:", err.message);
    res.status(500).json({ message: "Failed to fetch program details" });
  }
};

// ========== TMDB SEARCH/DISCOVERY ========== //
const searchOrDiscoverPrograms = async (req, res, next) => {
  try {
    const {
      type = "movie",
      query: searchTerm,
      category,
      language = "en-US",
    } = req.query;

    const endpoint = searchTerm ? `/search/${type}` : `/discover/${type}`;

    const params = {
      language,
      query: searchTerm,
      with_genres: category,
    };

    await Log.create({
      action: "User Searched or Discovered Programs",
      user: req.user ? req.user._id : null,
      details: { type, query, genre },
    });

    const results = await tmdbRequest(endpoint, params);
    res.status(200).json(results);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching programs", error: err.message });
  }
};

// ========== MOVIES & TV SHOWS PAGES ========== //
const getProgramsByType = async (req, res, next) => {
  try {
    const { type } = req.params;
    const results = await tmdbRequest(`/discover/${type}`);
    res.status(200).json(results);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching programs", error: err.message });
  }
};

// ========== EPISODES & EXTRA INFO ========== //
const getSeriesEpisodes = async (req, res, next) => {
  try {
    const { seriesId, seasonNumber } = req.params;
    const data = await tmdbRequest(`/tv/${seriesId}/season/${seasonNumber}`);
    res.status(200).json(data.episodes || []);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching episodes", error: err.message });
  }
};

const getExtraProgramInfo = async (req, res, next) => {
  try {
    const { id, type } = req.params;
    const credits = await tmdbRequest(`/${type}/${id}/credits`);
    const images = await tmdbRequest(`/${type}/${id}/images`);
    res.status(200).json({
      productionTeam: credits.crew || [],
      images: (images.backdrops || []).slice(0, 3),
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching extra info", error: err.message });
  }
};

// ========== CREATE PROGRAM (ADMIN) ==========
const createProgramManually = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const {
      tmdbId,
      title,
      type,
      overview,
      posterPath,
      backdropPath,
      genres,
      releaseDate,
      popularity,
      voteAverage,
      voteCount,
      runtime,
      seasons,
      status,
      originalLanguage,
      cast,
      trailerKey,
      director,
      creators,
      contentTags,
      maturityRating,
      additionalImages,
      featured,
      trending,
      newRelease,
      popularInIsrael,
    } = req.body;

    if (!tmdbId || !title || !type || !overview) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!["movie", "tv"].includes(type)) {
      return res
        .status(400)
        .json({ message: "Invalid type: must be movie or tv" });
    }

    const exists = await Program.findOne({ tmdbId });
    if (exists) {
      return res
        .status(409)
        .json({ message: "Program already exists", programId: exists._id });
    }

    const newProgram = new Program({
      tmdbId,
      title,
      type,
      overview,
      posterPath,
      backdropPath,
      genres,
      releaseDate,
      popularity,
      voteAverage,
      voteCount,
      runtime,
      seasons,
      status,
      originalLanguage,
      cast,
      trailerKey,
      director,
      creators,
      contentTags,
      maturityRating,
      additionalImages,
      featured: featured || false,
      trending: trending || false,
      newRelease: newRelease || false,
      popularInIsrael: popularInIsrael || false,
    });

    const saved = await newProgram.save();

    await Log.create({
      action: "Admin Created Program",
      user: req.user._id,
      details: {
        title: newProgram.title,
        tmdbId: newProgram.tmdbId,
        programId: newProgram._id,
      },
    });

    res.status(201).json({ message: "Program created", program: saved });
  } catch (err) {
    console.error("Error creating program:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ========== CHECK IF PROGRAM EXISTS ==========
const checkIfProgramExists = async (req, res) => {
  try {
    const { tmdbId } = req.params;
    if (!tmdbId)
      return res.status(400).json({ message: "TMDB ID is required" });

    const program = await Program.findOne({ tmdbId: Number(tmdbId) });

    await Log.create({
      action: "Admin Checked Program Existence",
      user: req.user._id,
      details: { tmdbId, exists: !!program },
    });

    res.status(200).json({
      exists: !!program,
      program: program
        ? {
            _id: program._id,
            title: program.title,
            type: program.type,
            tmdbId: program.tmdbId,
          }
        : null,
    });
  } catch (err) {
    res.status(500).json({ message: "Error checking program" });
  }
};

// ========== SEARCH TMDB FOR ADMIN ==========
const searchTmdbDirect = async (req, res) => {
  try {
    const { query, page = 1 } = req.query;
    if (!query)
      return res.status(400).json({ message: "Search query is required" });

    const url = `https://api.themoviedb.org/3/search/multi`;
    const response = await axios.get(url, {
      params: { api_key: TMDB_API_KEY, query, page },
    });

    let results = response.data.results.filter(
      (item) => item.media_type === "movie" || item.media_type === "tv"
    );

    const ids = results.map((item) => item.id);
    const existing = await Program.find({ tmdbId: { $in: ids } }).select(
      "tmdbId"
    );

    const existingIds = existing.map((doc) => doc.tmdbId);
    results = results.map((item) => ({
      ...item,
      existsInDb: existingIds.includes(item.id),
    }));

    await Log.create({
      action: "Admin Searched TMDB",
      user: req.user._id,
      details: { query },
    });

    res.status(200).json({
      page: response.data.page,
      totalPages: response.data.total_pages,
      results,
    });
  } catch (err) {
    res.status(500).json({ message: "Error searching TMDB" });
  }
};

// ========== PREVIEW TMDB DETAILS WITHOUT SAVE ==========

const fetchTmdbDetails = async (tmdbId, type) => {
  if (!tmdbId || !["movie", "tv"].includes(type)) {
    throw new Error("Invalid TMDB ID or type");
  }

  const url = `${TMDB_BASE_URL}/${type}/${tmdbId}`;
  const response = await axios.get(url, {
    params: {
      api_key: TMDB_API_KEY,
      language: "en-US",
      append_to_response: "credits,images",
    },
  });

  const data = response.data;
  const exists = await Program.findOne({ tmdbId: Number(tmdbId) });

  return {
    ...data,
    existsInDb: !!exists,
  };
};

const getTmdbDetailsPreview = async (req, res) => {
  try {
    const { tmdbId, type } = req.params;
    const result = await fetchTmdbDetails(tmdbId, type);

    if (req.user) {
      await Log.create({
        action: "Admin Previewed TMDB Program",
        user: req.user._id,
        details: { tmdbId, type },
      });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error("Error in getTmdbDetailsPreview:", err.message);
    res.status(500).json({ message: "Error fetching TMDB details" });
  }
};

// ========== route handler ========== //
const getProgramsByGenreAndType = async (req, res) => {
  const { genre, type = "movie" } = req.query;

  if (!genre) {
    return res.status(400).json({ message: "Genre is required" });
  }

  try {
    const results = await fetchProgramsByGenreAndType(type, genre);
    res.status(200).json(results.slice(0, 10));
  } catch (err) {
    console.error("TMDB genre/type fetch error:", err.message);
    res.status(500).json({ message: "Failed to fetch programs by genre/type" });
  }
};

module.exports = {
  getHomepageContent,
  getProgramDetails,
  searchOrDiscoverPrograms,
  getProgramsByType,
  getSeriesEpisodes,
  getExtraProgramInfo,
  createProgramManually,
  checkIfProgramExists,
  searchTmdbDirect,
  getTmdbDetailsPreview,
  getProgramsByGenreAndType,
};
