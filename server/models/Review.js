const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const reviewSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    profile: { type: Schema.Types.ObjectId, ref: "Profile", required: true },

    media: { type: Schema.Types.Mixed, required: true },

    rating: {
      type: Number,
      min: 0,
      max: 5,
      required: true,
      default: 0,
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

reviewSchema.index({ user: 1, profile: 1, media: 1 }, { unique: true });

reviewSchema.index({ media: 1, createdAt: -1 });
reviewSchema.index({ media: 1, rating: -1 });
reviewSchema.index({ user: 1, createdAt: -1 });
reviewSchema.index({ isPublic: 1 });

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
