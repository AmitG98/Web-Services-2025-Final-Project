const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Log = require("../models/Log");

const createToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

const register = async (req, res, next) => {
  try {
    const { email, phone, password, role} = req.body;

    if (!email && !phone) {
      return res.status(400).json({ message: "Email or phone is required" });
    }

    const existingUser = await User.findOne({
      $or: [
        email ? { email } : null,
        phone ? { phone } : null
      ].filter(Boolean),
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email or phone already in use" });
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password)) {
      console.log("Password does not meet policy");
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and include at least one letter and one digit",
      });
    }
    const allowedRoles = ["user", "admin", "moderator"];
    const userRole = allowedRoles.includes(role) ? role : "user";

    const userData = { password, role: userRole };
    if (email) userData.email = email;
    if (phone != null) userData.phone = phone;

    const user = new User(userData);
    await user.save();

    await Log.create({
      action: "User Registered",
      user: user._id,
      level: "info",
      details: { email: user.email, phone: user.phone, role: user.role },
    });

    const token = createToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3600000,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(201).json({ message: "User registered", userId: user._id });
  } catch (err) {
    console.error("Error in register:", err);
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { identifier, password, rememberMe } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({ message: "Identifier and password are required" });
    }
    const user = await User.findOne({
      $or: [
        { email: identifier },
        { phone: identifier }
      ]
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    await Log.create({
      action: "User Logged In",
      user: user._id,
      level: "info",
      details: { email: user.email, phone: user.phone },
    });

    const token = createToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: rememberMe ? 3600000 : undefined,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    console.error("Error in login:", err);
    next(err);
  }
};

module.exports = { register, login };