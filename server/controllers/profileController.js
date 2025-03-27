const User = require('../models/User');

exports.getProfiles = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.profiles);
  } catch (err) {
    next(err);
  }
};

exports.addProfile = async (req, res, next) => {
  try {
    const { name } = req.body;
    const user = await User.findById(req.user.id);

    if (user.profiles.length >= 5) {
      return res.status(400).json({ message: 'Max 5 profiles allowed' });
    }

    const newProfile = {
      name
    };

    user.profiles.push(newProfile);
    await user.save();
    res.status(201).json(user.profiles);
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { profileId } = req.params;
    const { name } = req.body;

    const user = await User.findById(req.user.id);
    const profile = user.profiles.id(profileId);
    if (!profile) return res.status(404).json({ message: 'Profile not found' });

    profile.name = name;
    await user.save();
    res.json(user.profiles);
  } catch (err) {
    next(err);
  }
};

exports.deleteProfile = async (req, res, next) => {
  try {
    const { profileId } = req.params;

    const user = await User.findById(req.user.id);
    const profile = user.profiles.id(profileId);
    if (!profile) return res.status(404).json({ message: 'Profile not found' });

    profile.remove();
    await user.save();
    res.json(user.profiles);
  } catch (err) {
    next(err);
  }
};
