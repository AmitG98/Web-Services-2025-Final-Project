const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, match: [/^\S+@\S+\.\S+$/, 'Invalid email format']},
  phone: { type: String, required: true, unique: true, match: [/^\+?\d{10,15}$/, 'Invalid phone number'], },
  password: { type: String,required: true, minlength: 8, validate: {
      validator: function (v) {
      return /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(v);
    }, message: 'Password must contain at least one letter and one number.' }},
  role: {type: String, enum: ["Admin", "User"], default: "User" }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next;
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (err) {
    throw err;
  }
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = model('User', userSchema);

