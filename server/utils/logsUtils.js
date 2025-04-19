const Log = require("../models/Log");

function getStartOfToday() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

const logOncePerDay = async (userId, action, details = {}) => {
    const alreadyExists = await Log.findOne({
        user: userId,
        action,
        createdAt: { $gte: getStartOfToday() },
    });

    if (!alreadyExists) {
        await Log.create({
        user: userId,
        action,
        level: "info",
        ...details,
        });
    }
};

module.exports = {logOncePerDay }
