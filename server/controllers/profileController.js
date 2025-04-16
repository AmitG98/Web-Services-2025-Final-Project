const Profile = require('../models/Profile');
const Log = require("../models/Log");

const AVATAR_OPTIONS = [
  "angryman.png", "blue.png", "chicken.png", "dark blue.png",
  "fluffyblue.png", "fluffygrey.png", "fluffyyellow.png", "green.png",
  "kids.png", "panda.png", "pink.png", "purple.png", "red.png",
  "yellow.png", "zombi.png"
];

const getRandomAvatar = () => {
  return AVATAR_OPTIONS[Math.floor(Math.random() * AVATAR_OPTIONS.length)];
};

const addInteraction = async (req, res, next) => {
  try {
    const { profileId } = req.params;
    const { programId, action } = req.body;

    if (!["click", "like"].includes(action)) {
      return res.status(400).json({ message: "Invalid action type" });
    }

    const profile = await Profile.findById(profileId);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const programExists = await Program.exists({ _id: programId });
    if (!programExists) {
      return res.status(404).json({ message: "Program not found" });
    }

    profile.userHistory.push({
      programId: 12345,
      type: "tv",
      action: "click"
    });

    await profile.save();

    res.status(200).json({ message: "Interaction added to history" });
  } catch (err) {
    console.error("Error adding interaction:", err);
    next(err);
  }
};

const getProfiles = async (req, res, next) => {
  try {
    const profiles = await Profile.find({ user: req.user._id });
    res.status(200).json(profiles);
  } catch (err) {
    next(err);
  }
};

const addProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const existingProfiles = await Profile.find({ user: userId }).limit(6);
    if (existingProfiles.length >= 5) {
      return res.status(400).json({ message: "You can only create up to 5 profiles." });
    }
    const randomAvatar = getRandomAvatar();
    const newProfile = new Profile({
      ...req.body,
      user: userId,
      avatar: randomAvatar,
    });
    await newProfile.save();
    await Log.create({
      action: "Profile Created",
      user: userId,
      details: { profileId: newProfile._id, name: newProfile.name, avatar: newProfile.avatar },
      level: "info"
    });    
    res.status(201).json({
      message: "New profile added successfully",
      data: newProfile,
    });
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { profileId } = req.params;
    const { name } = req.body;
    const updatedProfile = await Profile.findOneAndUpdate(
      { _id: profileId, user: req.user._id },
      { name },
      { new: true }
    );
    if (!updatedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    await Log.create({
      action: "Profile Updated",
      user: req.user._id,
      details: { profileId, updatedFields: { name } },
      level: "info"
    });
    res.status(200).json(updatedProfile);
  } catch (err) {
    next(err);
  }
};

const deleteProfile = async (req, res, next) => {
  try {
    const { profileId } = req.params;
    const deletedProfile = await Profile.findOneAndDelete({
      _id: profileId,
      user: req.user._id,
    });
    if (!deletedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    await Log.create({
      action: "Profile Deleted",
      user: req.user._id,
      details: { profileId },
      level: "warn"
    });    
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = { addInteraction, getProfiles, addProfile, updateProfile, deleteProfile}