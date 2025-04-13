const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const logSchema = new Schema({
  action: { type: String, required: true },
  user: { type: mongoose.Types.ObjectId, ref: 'User' },
  details: { type: Object },
  level: { type: String, enum: ['info', 'warn', 'error'], default: 'info' }
}, { timestamps: true });

module.exports = model("Log", logSchema);
