const mongoose = require('mongoose');

const { Schema, model, Types } = mongoose;

const programSchema = new Schema(
  {
    tmdbId: { type: Number, default: null },
    type: { type: String, enum: ["movie", "tv"], required: true },
    source: { type: String, enum: ["tmdb", "uploaded"], required: true, default: "uploaded" },
    title: { type: String, required: true },
    originalTitle: { type: String, default: "" },
    originalLanguage: {type: String, default: "en" },
    overview: {type: String, default: "" },
    releaseDate: { type: String,default: null},
    genreIds: [ { type: Number } ],
    posterPath: {type: String,default: null,},
    backdropPath: {type: String,default: null,},
    isAdult: {type: Boolean,default: false,},
    hasVideo: {type: Boolean,default: false,},
    popularity: {type: Number,default: 0,},
    voteAverage: {type: Number,default: 0,},
    voteCount: {type: Number,default: 0,},
    views: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
    runtime: { type: Number, default: null },
    seasons: { type: Array, default: [] },
    status: { type: String, default: "" },
    cast: { type: Array, default: [] },
    trailerKey: { type: String, default: "" },
    director: { type: String, default: "" },
    creators: { type: Array, default: [] },
    contentTags: { type: [String], default: [] },
    maturityRating: { type: String, default: "" },
    additionalImages: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
    trending: { type: Boolean, default: false },
    newRelease: { type: Boolean, default: false },
    popularInIsrael: { type: Boolean, default: false },
    createdBy: {type: Types.ObjectId,ref: "User",default: null,},
  },{timestamps: true}
);

module.exports = model("Program", programSchema);

