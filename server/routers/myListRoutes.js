const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");
const myListController = require("../controllers/myListController");

router.post("/", verifyToken, myListController.addToList);
// router.delete("/:programId", verifyToken, myListController.removeFromList);
router.get("/", verifyToken, myListController.getMyList);
// router.get("/recent", verifyToken, myListController.getRecentItems);

module.exports = router;