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

    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'Email already in use' });

    if (!/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password)) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long and include at least one letter and one digit",
      });
    }    

    const user = new User({ username, password });
    await user.save();

    const token = createToken(user);
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000, sameSite: "strict", secure: process.env.NODE_ENV === "production",});
    res.status(201).json({ message: 'User registered', userId: user._id });
  } catch (err) {
    next(err);
  }
};


const login = async (req, res, next) => {
  try {
    const { username, password, rememberMe } = req.body;

    const user = await User.findOne({ username });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = createToken(user);
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: rememberMe ? 3600000 : undefined,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    next(err);
  }
};

module.exports = {register, login}