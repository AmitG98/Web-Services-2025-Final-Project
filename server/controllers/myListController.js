const MyList = require("../models/MyList");
const Log = require("../models/Log");
const { buildMyList } = require("../utils/programUtils");
const { filterWithImage } = require("./programController");


const addToList = async (req, res, next) => {
  try {
    console.log("📥 [addToList] req.body:", req.body);
    console.log("👤 [addToList] req.user._id:", req.user?._id);
    
    const { programId, title, posterPath } = req.body;
    const userId = req.user._id;

    const entry = await MyList.create({ userId, programId, title, posterPath });

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

const removeFromList = async (req, res, next) => {
  try {
    const entry = await MyList.findOneAndDelete({
      userId: req.user._id,
      programId: req.params.programId,
    });

    if (!entry) {
      return res.status(404).json({ message: "Program not found in your list." });
    }

    await Log.create({
      action: "Removed from My List",
      user: req.user._id,
      details: { programId: req.params.programId },
      level: "info",
    });    

    res.status(200).json({ message: "Removed from list." });
  } catch (err) {
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
    console.error("Error in getMyList:", err.message);
    next(err);
  }
};


const getRecentItems = async (req, res, next) => {
  try {
    const items = await MyList.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json(items);
  } catch (err) {
    next(err);
  }
};

module.exports = {
    addToList,
    removeFromList,
    getMyList,
    getRecentItems
}