const Review = require("../models/Review");
const Program = require("../models/Program");
const Log = require("../models/Log");

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

// const getReviewsByProgram = async (req, res, next) => {
//   try {
//     const { id: mediaId } = req.params;
//     const {
//       limit = 10,
//       offset = 0,
//       sortBy = "createdAt",
//       sortOrder = "desc",
//     } = req.query;

//     const sort = {};
//     sort[sortBy] = sortOrder === "asc" ? 1 : -1;

//     const query = {
//       media: mediaId,
//       $or: [{ isPublic: true }, ...(req.user ? [{ user: req.user._id }] : [])],
//     };

//     const reviews = await Review.find(query)
//       .sort(sort)
//       .skip(parseInt(offset))
//       .limit(parseInt(limit))
//       .populate("profile", "name avatar")
//       .lean();

//     const total = await Review.countDocuments(query);

//     res.json({
//       reviews,
//       pagination: {
//         total,
//         limit: parseInt(limit),
//         offset: parseInt(offset),
//         hasMore: parseInt(offset) + parseInt(limit) < total,
//       },
//     });
//   } catch (err) {
//     next(err);
//   }
// };

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

// const updateReview = async (req, res, next) => {
//   try {
//     const { reviewId } = req.params;
//     const { rating, comment, isPublic, spoiler } = req.body;

//     const review = await Review.findById(reviewId);
//     if (!review || review.user.toString() !== req.user._id.toString()) {
//       return res
//         .status(403)
//         .json({ message: "Not authorized or review not found" });
//     }

//     if (rating !== undefined) review.rating = rating;
//     if (comment !== undefined) review.comment = comment;
//     if (isPublic !== undefined) review.isPublic = isPublic;
//     if (spoiler !== undefined) review.spoiler = spoiler;

//     await review.save();

//     await Log.create({
//       action: "Review Updated",
//       user: req.user._id,
//       details: {
//         reviewId: review._id,
//         mediaId: review.media,
//         updatedFields: { rating, comment, isPublic, spoiler },
//       },
//       level: "info",
//     });

//     if (typeof review.media !== "string" || !review.media.startsWith("tmdb-")) {
//       const stats = await Review.aggregate([
//         { $match: { media: review.media, rating: { $gt: 0 } } },
//         {
//           $group: {
//             _id: "$media",
//             averageRating: { $avg: "$rating" },
//             totalReviews: { $sum: 1 },
//           },
//         },
//       ]);
//       await Program.findByIdAndUpdate(review.media, {
//         averageRating: stats[0]?.averageRating || 0,
//         reviewCount: stats[0]?.totalReviews || 0,
//       });
//     }

//     res.json(review);
//   } catch (err) {
//     next(err);
//   }
// };

// const deleteReview = async (req, res, next) => {
//   try {
//     const { reviewId } = req.params;
//     const review = await Review.findById(reviewId);

//     if (!review || review.user.toString() !== req.user._id.toString()) {
//       return res
//         .status(403)
//         .json({ message: "Not authorized or review not found" });
//     }

//     const mediaId = review.media;
//     await review.remove();

//     await Log.create({
//       action: "Review Deleted",
//       user: req.user._id,
//       details: {
//         reviewId: review._id,
//         programId: review.program,
//         deletedBy: req.user.role,
//       },
//       level: "warn",
//     });

//     if (typeof mediaId !== "string" || !mediaId.startsWith("tmdb-")) {
//       const stats = await Review.aggregate([
//         { $match: { media: mediaId, rating: { $gt: 0 } } },
//         {
//           $group: {
//             _id: "$media",
//             averageRating: { $avg: "$rating" },
//             totalReviews: { $sum: 1 },
//           },
//         },
//       ]);
//       await Program.findByIdAndUpdate(mediaId, {
//         averageRating: stats[0]?.averageRating || 0,
//         reviewCount: stats[0]?.totalReviews || 0,
//       });
//     }

//     res.json({ message: "Review deleted" });
//   } catch (err) {
//     next(err);
//   }
// };

// const likeReview = async (req, res, next) => {
//   try {
//     const { reviewId } = req.params;
//     const review = await Review.findByIdAndUpdate(
//       reviewId,
//       { $inc: { likes: 1 } },
//       { new: true }
//     );

//     if (!review) return res.status(404).json({ message: "Review not found" });
//     res.status(200).json({ likes: review.likes });
//   } catch (err) {
//     next(err);
//   }
// };

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
  // getReviewsByProgram,
  getLast10ReviewsByUser,
  // updateReview,
  // deleteReview,
  // likeReview,
  getTopRatedPrograms,
  getMostReviewedPrograms,
};
