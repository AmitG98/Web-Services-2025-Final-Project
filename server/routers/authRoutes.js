const express = require('express');
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware.js")
const { register, login } = require('../controllers/authController');

router.get("/profile", verifyToken, (req, res) => {
    res.status(200).json(req.user);
  });
router.post('/register', register);
router.post('/login', login);

module.exports = router;
