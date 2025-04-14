const User = require('../models/User');
const jwt = require('jsonwebtoken');

const createToken = (user) => {
  return jwt.sign(
    { id: user._id},
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log("📦 Register request:", { username, password });

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log("⚠️ User already exists:", username);
      return res.status(400).json({ message: 'Email already in use' });
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password)) {
      console.log("❌ Password does not meet policy");
      return res.status(400).json({
        message: "Password must be at least 8 characters long and include at least one letter and one digit",
      });
    }    

    const user = new User({ username, password });
    await user.save();

    const token = createToken(user);
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000, sameSite: "strict", secure: process.env.NODE_ENV === "production",});
    console.log("✅ User registered:", user._id);
    res.status(201).json({ message: 'User registered', userId: user._id });
  } catch (err) {
    console.error("❗ Error in register:", err);
    next(err);
  }
};


const login = async (req, res, next) => {
  try {
    console.log("🔐 Login request body:", req.body);
    const { username, password, rememberMe } = req.body;

    const user = await User.findOne({ username });
    console.log("🔍 Found user:", user ? user.username : "❌ Not found");

    if (!user || !(await user.comparePassword(password))) {
      console.log("❌ Invalid credentials for:", username);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = createToken(user);
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: rememberMe ? 3600000 : undefined,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    console.log("✅ Login successful:", user.username);
    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    console.error("❗ Error in login:", err);
    next(err);
  }
};

module.exports = {register, login}