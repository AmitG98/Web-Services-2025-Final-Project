const Profile = require("../models/Profile");
const { fetchProgramsByGenreAndType } = require("../utils/tmdbUtils");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const genreMap = {
  action: 28,
  adventure: 12,
  animation: 16,
  comedy: 35,
  crime: 80,
  documentary: 99,
  drama: 18,
  family: 10751,
  fantasy: 14,
  history: 36,
  horror: 27,
  music: 10402,
  mystery: 9648,
  romance: 10749,
  "sci-fi": 878,
  thriller: 53,
  war: 10752,
  western: 37,
};

async function getPersonalizedRecommendations(userId) {
  const profile = await Profile.findOne({ user: userId });
  if (!profile || !profile.userHistory || profile.userHistory.length === 0) {
    return [];
  }

  const historyText = profile.userHistory.map((item) =>
    `• ${item.action.toUpperCase()} ${item.programId} at ${item.timestamp.toISOString()}`
  ).join("\n");

  const prompt = `
You are an AI recommendation engine. Based on this user's activity history, summarize their viewing preferences.
Activity:
${historyText}

Output: a JSON with preferences including genres (like "action", "drama", "comedy"), types (movie or tv), and optional keywords.
`;

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  const responseText = await result.response.text();

  let preferences;
  try {
    const jsonText = responseText.match(/\{[\s\S]*\}/)?.[0];
    preferences = JSON.parse(jsonText);
  } catch (e) {
    console.error("Failed to parse Gemini output:", responseText);
    return [];
  }

  const genreKey = preferences.genres?.[0]?.toLowerCase();
  const tmdbGenreId = genreMap[genreKey] || 28;
  const type = preferences.types?.[0] || "movie";

  const results = await fetchProgramsByGenreAndType(type, tmdbGenreId);
  return results.slice(0, 10);
}

const getRecommendations = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ error: "Missing userId" });

    const results = await getPersonalizedRecommendations(userId);
    res.json(results);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Failed to generate recommendations" });
  }
};

module.exports = { getPersonalizedRecommendations, getRecommendations };