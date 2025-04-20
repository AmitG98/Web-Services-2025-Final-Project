const Review = require("../models/Review");
const { logOncePerDay } = require("../utils/logsUtils");

const addReview = async (req, res, next) => {
  try {
    const { mediaId, profileId, rating, comment, isPublic, spoiler, userId } =
      req.body;

    if (!userId) {
      return res.status(400).json({ message: "Missing userId" });
    }

    const existingReview = await Review.findOne({
      user: userId,
      profile: profileId,
      media: mediaId,
    });
    if (existingReview) {
      existingReview.rating = rating;
      existingReview.comment = comment;
      existingReview.isPublic = isPublic;
      existingReview.spoiler = spoiler;
      await existingReview.save();
      return res
        .status(200)
        .json({ message: "Review updated", review: existingReview });
    }

    const review = new Review({
      user: userId,
      profile: profileId,
      media: mediaId,
      rating: rating || 0,
      comment,
      isPublic: isPublic !== undefined ? isPublic : true,
      spoiler: spoiler || false,
    });

    await review.save();
    await logOncePerDay(userId, "Added review");

    res.status(201).json({ message: "Review created successfully", review });
  } catch (err) {
    console.error("REVIEW ERROR:", err);
    next(err);
  }
};

const getLast10ReviewsByUser = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const reviews = await Review.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("media", "title posterPath type")
      .lean();

    res.status(200).json(reviews);
  } catch (err) {
    next(err);
  }
};

const getTopRatedPrograms = async (req, res, next) => {
  try {
    const { limit = 10 } = req.query;

    const programs = await Review.aggregate([
      { $match: { rating: { $gt: 0 }, media: { $type: "objectId" } } },
      {
        $group: {
          _id: "$media",
          averageRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
        },
      },
      { $match: { totalReviews: { $gte: 1 } } },
      {
        $lookup: {
          from: "programs",
          localField: "_id",
          foreignField: "_id",
          as: "program",
        },
      },
      { $unwind: "$program" },
      {
        $project: {
          _id: "$program._id",
          title: "$program.title",
          type: "$program.type",
          posterPath: "$program.posterPath",
          averageRating: 1,
          totalReviews: 1,
        },
      },
      { $sort: { averageRating: -1, totalReviews: -1 } },
      { $limit: parseInt(limit) },
    ]);

    res.status(200).json(programs);
  } catch (err) {
    next(err);
  }
};

const getMostReviewedPrograms = async (req, res, next) => {
  try {
    const { limit = 10 } = req.query;

    const programs = await Review.aggregate([
      { $match: { rating: { $gt: 0 }, media: { $type: "objectId" } } },
      {
        $group: {
          _id: "$media",
          averageRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
        },
      },
      { $match: { totalReviews: { $gte: 1 } } },
      {
        $lookup: {
          from: "programs",
          localField: "_id",
          foreignField: "_id",
          as: "program",
        },
      },
      { $unwind: "$program" },
      {
        $project: {
          _id: "$program._id",
          title: "$program.title",
          type: "$program.type",
          posterPath: "$program.posterPath",
          averageRating: 1,
          totalReviews: 1,
        },
      },
      { $sort: { totalReviews: -1, averageRating: -1 } },
      { $limit: parseInt(limit) },
    ]);

    res.status(200).json(programs);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addReview,
  getLast10ReviewsByUser,
  getTopRatedPrograms,
  getMostReviewedPrograms,
};
