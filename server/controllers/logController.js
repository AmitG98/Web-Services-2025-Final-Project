const Log = require("../models/Log");

exports.getAllLogs = async (req, res) => {
  try {
    const logs = await Log.find()
      .sort({ createdAt: -1 })
      .populate("user", "username role");
    res.status(200).json(logs);
  } catch (error) {
    console.error("Error fetching logs:", error.message);
    res.status(500).json({ message: "Failed to retrieve logs" });
  }
};
