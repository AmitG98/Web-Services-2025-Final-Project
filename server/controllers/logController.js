const Log = require("../models/Log");

const getAllLogs = async (req, res) => {
  try {
    const logs = await Log.find()
      .sort({ createdAt: -1 })
      .populate("user", "username role");
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve logs" });
  }
};

module.exports = { getAllLogs }
