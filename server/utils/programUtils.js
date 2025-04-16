const { getTMDBImageUrl, fetchTmdbDetails, tmdbRequest } = require("../utils/tmdbUtils");

const buildRecentReviews = async (reviews) => {
  if (!reviews.length) return [];

  const enriched = await Promise.all(
    reviews.map(async (review, i) => {
      const tmdbId = review.media;
      const typeGuess = "movie"; // שיפור: אפשר לזהות מסוג ID בעתיד

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

const getTopRated = async (type = "movie", limit = 10) => {
  try {
    const safeType = ["movie", "tv"].includes(type) ? type : "movie";
    const endpoint = `/discover/${safeType}`;
    const params = {
      sort_by: "vote_average.desc",
      "vote_count.gte": 1000,
      language: "en-US",
    };

    const results = await tmdbRequest(endpoint, params);
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
          console.warn(`MyList[${i}] - Plain numeric string. Assuming TMDB movie`);
          tmdbId = programId;
        } else {
          console.warn(`MyList[${i}] - Invalid TMDB format`);
          return null;
        }
      } else if (typeof programId === "number") {
        console.warn(`MyList[${i}] - Raw number. Assuming TMDB movie`);
        tmdbId = programId.toString();
      } else {
        console.warn(`MyList[${i}] - Invalid or missing programId`);
        return null;
      }

      try {
        const tmdb = await fetchTmdbDetails(tmdbId, type);
        return {
          ...item.toObject(),
          program: {
            tmdbId: tmdb.id,
            type,
            title: tmdb.title || tmdb.name,
            posterPath: getTMDBImageUrl(tmdb.poster_path, "w500"),
            backdropPath: getTMDBImageUrl(tmdb.backdrop_path, "w780"),
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

module.exports = { buildRecentReviews, getTopRated, buildMyList};