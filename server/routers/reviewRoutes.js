const express = require("express");
const router = express.Router();

const { verifyToken} = require("../middleware/authMiddleware");
const reviewController = require("../controllers/reviewController");

router.post("/", (req, res, next) => {
  next();
}, reviewController.addReview)
router.get("/my-reviews", verifyToken, reviewController.getLast10ReviewsByUser);
router.get("/top-rated", reviewController.getTopRatedPrograms);
router.get('/most-reviewed', reviewController.getMostReviewedPrograms);

module.exports = router;
