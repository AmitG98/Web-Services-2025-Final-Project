const { TMDB_BASE_URL, getTMDBImageUrl, fetchTmdbDetails, tmdbRequest } = require("../utils/tmdbUtils");
const axios = require("axios");

const getTopWatchedInIsrael = async (limit = 10, type) => {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) throw new Error("TMDB API key is missing");

  const endpoint = type && ["movie", "tv"].includes(type)
    ? `${TMDB_BASE_URL}/trending/${type}/week`
    : `${TMDB_BASE_URL}/trending/all/week`;

  const response = await axios.get(endpoint, {
    params: {
      api_key: apiKey,
      region: "IL",
    },
  });

  let items = response.data.results;

  if (!type) {
    items = items.filter(item => ["movie", "tv"].includes(item.media_type));
  }

  if (type && ["movie", "tv"].includes(type)) {
    items = items.filter(item => item.media_type === type);
  }

  items = items.slice(0, limit);

  const detailed = await Promise.all(
    items.map(async (item) => {
      try {
        const data = await fetchTmdbDetails(item.id, item.media_type || type);
        return {
          tmdbId: data.id,
          type: item.media_type || type,
          title: data.title || data.name,
          overview: data.overview || "",
          posterPath: data.poster_path,
          backdropPath: data.backdrop_path,
          genres: data.genres?.map(g => g.name) || [],
          popularity: data.popularity || 0,
          existsInDb: data.existsInDb,
          releaseDate: data.release_date || data.first_air_date || null,
        };
      } catch (err) {
        console.warn(`Failed to fetch details for TMDB ID ${item.id}:`, err.message);
        return null;
      }
    })
  );

  return detailed.filter(Boolean);
};


const buildRecentReviews = async (reviews) => {
  if (!reviews.length) return [];

  const enriched = await Promise.all(
    reviews.map(async (review, i) => {
      const tmdbId = review.media;
      const typeGuess = "movie";

      try {
        const tmdb = await fetchTmdbDetails(tmdbId, typeGuess);
        const programData = {
          tmdbId: tmdb.id,
          type: typeGuess,
          title: tmdb.title || tmdb.name,
          posterPath: getTMDBImageUrl(tmdb.poster_path, "w500"),
          backdropPath: getTMDBImageUrl(tmdb.backdrop_path, "w780"),
        };

        return {
          ...review.toObject(),
          program: programData,
        };
      } catch (err) {
        console.error(`Failed to fetch TMDB details for review #${i + 1} (tmdbId=${tmdbId}):`, err.message);
        return null;
      }
    })
  );

  return enriched.filter((r) => r?.program?.posterPath);
};

const getTopRated = async (type = "all", limit = 10) => {
  try {
    if (type === "all") {
      const [movies, tv] = await Promise.all([
        tmdbRequest("/discover/movie", {
          sort_by: "vote_average.desc",
          "vote_count.gte": 1000,
          language: "en-US",
        }),
        tmdbRequest("/discover/tv", {
          sort_by: "vote_average.desc",
          "vote_count.gte": 1000,
          language: "en-US",
        }),
      ]);
      return [...movies, ...tv].slice(0, limit);
    }

    const endpoint = `/discover/${["movie", "tv"].includes(type) ? type : "movie"}`;
    const results = await tmdbRequest(endpoint, {
      sort_by: "vote_average.desc",
      "vote_count.gte": 1000,
      language: "en-US",
    });

    return results.slice(0, limit);
  } catch (err) {
    console.error("Error in getTopRated:", err.message);
    return [];
  }
};


const buildMyList = async (myListRaw) => {
  const enriched = await Promise.all(
    myListRaw.map(async (item, i) => {
      const programId = item.programId;
      let type = "movie";
      let tmdbId;

      if (typeof programId === "string") {
        const match = programId.match(/^tmdb-(movie|tv)-(\d+)$/);
        if (match) {
          [, type, tmdbId] = match;
        } else if (!isNaN(programId)) {
          tmdbId = programId;
        } else {
          return null;
        }
      } else if (typeof programId === "number") {
        tmdbId = programId.toString();
      } else {
        return null;
      }

      try {
        const tmdb = await fetchTmdbDetails(tmdbId, type);
        const posterPath = getTMDBImageUrl(tmdb.poster_path, "w500");
        const backdropPath = getTMDBImageUrl(tmdb.backdrop_path, "w780");

        return {
          ...item.toObject(),
          program: {
            tmdbId: tmdb.id,
            type,
            title: tmdb.title || tmdb.name,
            posterPath,
            backdropPath,
          },
        };
      } catch (err) {
        console.error(`MyList[${i}] - Failed to fetch TMDB:`, err.message);
        return null;
      }
    })
  );

  const result = enriched.filter((item) => item?.program?.posterPath);
  return result;
};

module.exports = { buildRecentReviews, getTopRated, buildMyList, getTopWatchedInIsrael};