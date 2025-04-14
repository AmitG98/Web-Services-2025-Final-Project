const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const reviewSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    profile: { type: Schema.Types.ObjectId, ref: "Profile", required: true },

    // Media: can be a TMDB id (string like "tmdb-12345") or MongoDB ObjectId (Program)
    media: { type: Schema.Types.Mixed, required: true },

    rating: {
      type: Number,
      min: 0,
      max: 5,
      required: true,
      default: 0, // 0 = comment only
    },
    comment: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    isPublic: { type: Boolean, default: true },
    likes: { type: Number, default: 0 },
    spoiler: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// === Indexes ===

// One review per profile+media (even if they use multiple users or devices)
reviewSchema.index({ user: 1, profile: 1, media: 1 }, { unique: true });

// Useful query patterns
reviewSchema.index({ media: 1, createdAt: -1 }); // Latest reviews
reviewSchema.index({ media: 1, rating: -1 });    // Top-rated
reviewSchema.index({ user: 1, createdAt: -1 });  // User history
reviewSchema.index({ isPublic: 1 });             // Public filters

// === Static methods ===

/**
 * Calculate average rating + review count for a given media
 */
reviewSchema.statics.getAverageRating = async function (mediaId) {
  try {
    let mediaQuery;
    try {
      mediaQuery = mongoose.Types.ObjectId(mediaId);
    } catch {
      mediaQuery = mediaId;
    }

    const result = await this.aggregate([
      { $match: { media: mediaQuery, rating: { $gt: 0 } } },
      {
        $group: {
          _id: "$media",
          averageRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
        },
      },
    ]);

    return result.length > 0
      ? {
          averageRating: parseFloat(result[0].averageRating.toFixed(1)),
          totalReviews: result[0].totalReviews,
        }
      : {
          averageRating: 0,
          totalReviews: 0,
        };
  } catch (err) {
    console.error("getAverageRating error:", err);
    return { averageRating: 0, totalReviews: 0 };
  }
};

/**
 * Return top-rated media objects (only internal Programs), sorted by averageRating
 */
reviewSchema.statics.getTopRatedMedia = async function (limit = 10) {
  return this.aggregate([
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
    { $limit: limit },
  ]);
};

module.exports = model("Review", reviewSchema);
