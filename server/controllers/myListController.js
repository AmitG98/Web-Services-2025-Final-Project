const MyList = require("../models/MyList");
const Log = require("../models/Log");
const { buildMyList } = require("../utils/programUtils");
const { filterWithImage } = require("./programController");
const { getTMDBImageUrl } = require("../utils/tmdbUtils");

const addToList = async (req, res, next) => {
  try {
    const { programId, title, posterPath } = req.body;
    const userId = req.user._id;
    const fullPosterPath = getTMDBImageUrl(posterPath, "w500");
    const entry = await MyList.create({ userId, programId, title, posterPath: fullPosterPath });

    await Log.create({
      action: "Added to My List",
      user: userId,
      details: { programId, title },
      level: "info",
    });

    res.status(201).json({ message: "Program added to your list.", entry });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Program already in your list." });
    }
    next(err);
  }
};

const getMyList = async (req, res, next) => {
  try {
    const rawItems = await MyList.find({ userId: req.user._id }).sort({ createdAt: -1 });
    const items = await buildMyList(rawItems);
    const filtered = filterWithImage(items);

    res.status(200).json({ items: filtered });
  } catch (err) {
    next(err);
  }
};

module.exports = {
    addToList,
    getMyList,
}