const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: { type: String, sparse: true, unique: true, lowercase: true, trim: true, match: [/^\S+@\S+\.\S+$/, 'Invalid email format']},
  phone: { type: String, sparse: true, unique: true, match: [/^\+?\d{10,15}$/, 'Invalid phone number'], },
  password: { type: String,required: true, minlength: 8, validate: {
      validator: function (v) {
      return /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(v);
    }, message: 'Password must contain at least one letter and one number.' }},
  role: {type: String, lowercase: true, enum: ["admin", "user"], default: "User" }
}, { timestamps: true });

userSchema.pre('validate', function (next) {
  if (!this.email && !this.phone) {
    const err = new Error("Either email or phone must be provided");
    next(err);
  } else {
    next();
  }
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = model('User', userSchema);

