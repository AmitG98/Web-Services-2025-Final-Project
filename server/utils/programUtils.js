const { TMDB_API_KEY, TMDB_BASE_URL, getTMDBImageUrl, fetchTmdbDetails, tmdbRequest } = require("../utils/tmdbUtils");

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
  console.log(`🔍 buildMyList - received ${myListRaw.length} items`);

  const enriched = await Promise.all(
    myListRaw.map(async (item, i) => {
      console.log(`📦 MyList[${i}] - program field:`, item.program);
      let programData;

      // Case 1: Already populated MongoDB Program
      if (typeof item.program === "object" && item.program !== null && item.program.title) {
        console.log(`✅ MyList[${i}] - using populated program`);
        programData = item.program;
      }

      // Case 2: TMDB string like "tmdb-movie-123456"
      else if (typeof item.program === "string" && item.program.startsWith("tmdb-")) {
        const [_, type, tmdbId] = item.program.match(/^tmdb-(movie|tv)-(\d+)$/) || [];
        if (!tmdbId || !type) {
          console.warn(`❌ MyList[${i}] - invalid TMDB string format:`, item.program);
          return null;
        }

        console.log(`🌐 MyList[${i}] - fetching TMDB ${type} ${tmdbId}`);
        try {
          const tmdb = await fetchTmdbDetails(tmdbId, type);
          programData = {
            tmdbId: tmdb.id,
            type,
            title: tmdb.title || tmdb.name,
            posterPath: getTMDBImageUrl(tmdb.poster_path, "w500"),
            backdropPath: getTMDBImageUrl(tmdb.backdrop_path, "w780"),
          };
        } catch (err) {
          console.error(`⚠️ MyList[${i}] - Failed to fetch TMDB:`, err.message);
          return null;
        }
      }

      // Case 3: Local ObjectId, not populated
      else {
        console.log(`🔎 MyList[${i}] - fetching local Program from DB`);
        try {
          const program = await Program.findById(item.program);
          if (!program) {
            console.warn(`❌ MyList[${i}] - Program not found in DB`);
            return null;
          }
          programData = program;
        } catch (err) {
          console.error(`⚠️ MyList[${i}] - Failed to fetch local Program:`, err.message);
          return null;
        }
      }

      const hasImage = programData?.posterPath || programData?.poster_path;
      console.log(`🎬 MyList[${i}] - Final title: ${programData?.title || programData?.name}, hasImage: ${!!hasImage}`);

      return {
        ...item.toObject(),
        program: programData,
      };
    })
  );

  const filtered = enriched.filter((item) => item?.program?.posterPath || item?.program?.poster_path);
  console.log(`✅ buildMyList - returning ${filtered.length} programs with images`);
  return filtered;
};

module.exports = { buildRecentReviews, getTopRated, buildMyList};