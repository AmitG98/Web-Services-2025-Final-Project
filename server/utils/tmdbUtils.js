const axios = require("axios");
const Program = require("../models/Program");
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const getTMDBImageUrl = (path, size = "original") => {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

const fetchTmdbDetails = async (tmdbId, type) => {
  if (!tmdbId || !["movie", "tv"].includes(type)) {
    throw new Error("Invalid TMDB ID or type");
  }

  const url = `${TMDB_BASE_URL}/${type}/${tmdbId}`;
  const response = await axios.get(url, {
    params: {
      api_key: TMDB_API_KEY,
      language: "en-US",
      append_to_response: "credits,images",
    },
  });

  const data = response.data;
  const exists = await Program.findOne({ tmdbId: Number(tmdbId) });

  return {
    ...data,
    existsInDb: !!exists,
  };
};

// const tmdbRequest = async (endpoint, params = {}) => {
//   const config = {
//     params: {
//       api_key: TMDB_API_KEY,
//       language: "en-US",
//       page: 1,
//       ...params,
//     },
//   };
//   const url = `https://api.themoviedb.org/3${endpoint}`;
//   const response = await axios.get(url, config);
//   return response.data.results || response.data;
// };

const tmdbRequest = async (endpoint, params = {}) => {
  const url = `${TMDB_BASE_URL}${endpoint}`;
  const config = {
    params: {
      api_key: TMDB_API_KEY,
      language: "en-US",
      page: 1,
      ...params,
    },
  };
  const response = await axios.get(url, config);
  return response.data.results || response.data;
};

const mapImageUrls = (programs) =>
  programs.map((p) => ({
    ...p,
    posterPath: getTMDBImageUrl(p.poster_path || p.posterPath, "w500"),
    backdropPath: getTMDBImageUrl(p.backdrop_path || p.backdropPath, "w780"),
}));

const fetchProgramsByGenreAndType = async (type = "movie", genreId = 28) => {
  return await tmdbRequest(`/discover/${type}`, {
    with_genres: genreId,
    sort_by: "popularity.desc",
  });
};



module.exports = {TMDB_BASE_URL, tmdbRequest, fetchTmdbDetails, mapImageUrls, fetchProgramsByGenreAndType, getTMDBImageUrl};
