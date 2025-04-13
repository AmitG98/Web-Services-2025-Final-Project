const express = require("express");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");
const logController = require("../controllers/logController");

router.get("/", verifyToken, isAdmin, logController.getAllLogs);

module.exports = router;
