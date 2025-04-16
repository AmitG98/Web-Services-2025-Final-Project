const express = require("express");
const router = express.Router();

const {
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
} = require("../controllers/programController");

const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

// ========== PUBLIC ROUTES ========== //

// Homepage rows (personalized, new, trending, etc.)
router.get("/home", verifyToken, getHomepageContent);

// Get a single program (DB or TMDB)
router.get("/tmdb/:tmdbId", verifyToken, getProgramDetails);

// Search or discover programs (TMDB)
router.get("/", searchOrDiscoverPrograms);

// Get only movies or only TV shows (TMDB)
router.get("/type/:type", getProgramsByType);

// Get list of episodes for a specific TV season
router.get("/episodes/:seriesId/:seasonNumber", getSeriesEpisodes);

// Get extra program info: production, images (TMDB)
router.get("/extras/:type/:id", getExtraProgramInfo);

router.get("/by-genre", getProgramsByGenreAndType);

// ========== ADMIN ROUTES ========== //

// Admin inserts a new program manually
router.post("/admin/create", verifyToken, isAdmin, createProgramManually);

// Check if program already exists in DB by TMDB ID
router.get("/admin/check/:tmdbId", verifyToken, isAdmin, checkIfProgramExists);

// Search TMDB for admin panel (includes `existsInDb` flag)
router.get("/admin/search", verifyToken, isAdmin, searchTmdbDirect);

// Preview TMDB program details before inserting
router.get("/admin/tmdb/:type/:tmdbId", verifyToken, isAdmin, getTmdbDetailsPreview);


module.exports = router;
