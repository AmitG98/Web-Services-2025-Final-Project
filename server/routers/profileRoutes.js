const express = require('express');
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const {
  getProfiles,
  addProfile,
  updateProfile,
  deleteProfile
} = require('../controllers/profileController');

router.use(verifyToken);

router.get('/', getProfiles);
router.post('/', addProfile);
router.put('/:profileId', updateProfile);
router.delete('/:profileId', deleteProfile);

module.exports = router;
