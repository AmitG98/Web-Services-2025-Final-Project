const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const myListSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    programId: { type: mongoose.Schema.Types.Mixed, required: true },
    title: { type: String, required: true },
    posterPath: { type: String, default: null },
  }, { timestamps: true });
  
myListSchema.index({ userId: 1, programId: 1 }, { unique: true });
  
module.exports = model('MyList', myListSchema);
  