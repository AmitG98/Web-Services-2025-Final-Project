const Log = require("../models/Log");

const logAction = async ({ action, user, details = {}, level = "info" }) => {
  try {
    await Log.create({ action, user, details, level });
  } catch (err) {
    console.error("Logging failed:", err.message);
  }
};

module.exports = logAction;