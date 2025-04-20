const express = require("express");
const router = express.Router();

const { verifyToken} = require("../middleware/authMiddleware");
const reviewController = require("../controllers/reviewController");

router.post("/", (req, res, next) => {
  next();
}, reviewController.addReview)
// router.get("/program/:id", verifyToken, reviewController.getReviewsByProgram);
router.get("/my-reviews", verifyToken, reviewController.getLast10ReviewsByUser);
// router.put("/:reviewId", verifyToken, reviewController.updateReview);
// router.delete("/:reviewId", verifyToken, reviewController.deleteReview);
// router.post("/:reviewId/like", verifyToken, reviewController.likeReview);

router.get("/top-rated", reviewController.getTopRatedPrograms);
router.get('/most-reviewed', reviewController.getMostReviewedPrograms);

module.exports = router;
