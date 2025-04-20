const express = require("express");
const router = express.Router();

const {
  getHomepageContent,
  getProgramDetails,
  getProgramsByType,
  getSeriesEpisodes,
  getExtraProgramInfo,
  getNewAndPopular,
  createProgramManually,
  getTmdbDetailsPreview,
  getProgramsByGenreAndType,
  searchPrograms
} = require("../controllers/programController");

const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

router.get("/home", verifyToken, getHomepageContent);
router.get("/tmdb/:tmdbId", verifyToken, getProgramDetails);
router.get("/", searchPrograms);
router.get("/type/:type", getProgramsByType);
router.get("/episodes/:seriesId/:seasonNumber", getSeriesEpisodes);
router.get("/extras/:type/:id", getExtraProgramInfo);
router.get("/by-genre", getProgramsByGenreAndType);
router.get("/new-and-popular", verifyToken, getNewAndPopular);

router.post("/admin/create", verifyToken, isAdmin, createProgramManually);
router.get("/admin/tmdb/:type/:tmdbId", verifyToken, isAdmin, getTmdbDetailsPreview);

module.exports = router;
