const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");
const myListController = require("../controllers/myListController");

router.post("/", verifyToken, myListController.addToList);
router.get("/", verifyToken, myListController.getMyList);

module.exports = router;