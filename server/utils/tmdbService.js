const axios = require("axios");
const { TMDB_BASE_URL, getTMDBImageUrl } = require("../utils/tmdbUtils");

const getTopWatchedInIsrael = async (limit = 10) => {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) throw new Error("TMDB API key is missing");

  const response = await axios.get(`${TMDB_BASE_URL}/trending/all/week`, {
    params: {
      api_key: apiKey,
      region: 'IL',
    },
  });

  return response.data.results
    .filter(item => item.poster_path && item.backdrop_path)
    .slice(0, limit)
    .map(item => ({
      tmdbId: item.id,
      type: item.media_type,
      source: "tmdb",
      title: item.title || item.name,
      originalTitle: item.original_title || item.original_name || "",
      originalLanguage: item.original_language || "en",
      overview: item.overview || "",
      releaseDate: item.release_date || item.first_air_date || null,
      genreIds: item.genre_ids || [],
      posterPath: item.poster_path,
      backdropPath: item.backdrop_path,
      isAdult: item.adult || false,
      hasVideo: item.video || false,
      popularity: item.popularity || 0,
      voteAverage: item.vote_average || 0,
      voteCount: item.vote_count || 0,
      views: 0,
      averageRating: 0,
      runtime: null,
      seasons: [],
      status: "",
      cast: [],
      trailerKey: "",
      director: "",
      creators: [],
      contentTags: [],
      maturityRating: "",
      additionalImages: [],
      featured: false,
      trending: false,
      newRelease: false,
      popularInIsrael: true,
      createdBy: null,
    }));
};

module.exports = { getTopWatchedInIsrael }