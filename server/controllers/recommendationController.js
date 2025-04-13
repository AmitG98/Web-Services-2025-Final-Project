import { Recommender } from "recommender";

const data = [
  { userId: "amit", itemId: "Inception", preference: 5 },
  { userId: "amit", itemId: "Dark", preference: 4 },
  { userId: "amit", itemId: "Avatar", preference: 1 },
  { userId: "david", itemId: "Dark", preference: 4 },
  { userId: "david", itemId: "Breaking Bad", preference: 5 },
  { userId: "david", itemId: "Inception", preference: 3 },
];

const recommender = new Recommender();
recommender.train(data);

export const getRecommendations = (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: "Missing userId" });

  const results = recommender.getRecommendations(userId, 3); // קבל 3 המלצות
  res.json(results);
};
