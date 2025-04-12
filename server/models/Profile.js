const mongoose = require('mongoose');

const { Schema, model } = require('mongoose');

const profileSchema = new Schema(
  {
    user: {type: Schema.Types.ObjectId,ref: "User",required: true },
    name: {type: String,required: true,trim: true },
    avatar: {type: String,default: "" },
    language: {type: String,default: "en" },
  },{ timestamps: true});

module.exports = model('Profile', profileSchema);
