const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const interactionSchema = new Schema({
  programId: { type: Number, required: true }, 
  action: { type: String, enum: ["click", "like"], required: true },
  timestamp: { type: Date, default: Date.now },
  type: { type: String, enum: ["movie", "tv"], required: true },
}, { _id: false });

const profileSchema = new Schema(
  {
    user: {type: Schema.Types.ObjectId,ref: "User",required: true },
    name: {type: String,required: true,trim: true },
    avatar: {type: String,default: "" },
    language: {type: String,default: "en" },
    userHistory: [interactionSchema]
  },{ timestamps: true});

module.exports = model('Profile', profileSchema);
