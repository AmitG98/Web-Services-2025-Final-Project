const axios = require("axios");
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const getTMDBImageUrl = (path, size = "original") => {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

const tmdbRequest = async (endpoint, params = {}) => {
  const config = {
    params: {
      api_key: TMDB_API_KEY,
      language: "en-US",
      page: 1,
      ...params,
    },
  };
  const url = `https://api.themoviedb.org/3${endpoint}`;
  const response = await axios.get(url, config);
  return response.data.results || response.data;
};

const fetchProgramsByGenreAndType = async (type = "movie", genreId = 28) => {
  return await tmdbRequest(`/discover/${type}`, {
    with_genres: genreId,
    sort_by: "popularity.desc",
  });
};

module.exports = {TMDB_BASE_URL, tmdbRequest, fetchProgramsByGenreAndType, getTMDBImageUrl};
