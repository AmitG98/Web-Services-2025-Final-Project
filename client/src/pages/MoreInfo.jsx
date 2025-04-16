import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProgramDetails } from "../api/program";
import { addInteraction } from "../api/logs";
import { useProfilesList } from "../hooks/useUserProfiles";
// import { useSelectedProfile } from "../hooks/useSelectedProfile";
import { useAddToWatchlist } from "../hooks/useWatchlist"; // ודאי שקיים

const MoreInfo = () => {
  const { id } = useParams();
  const [program, setProgram] = useState(null);
  const { data: profile } = useProfilesList();
  const { mutate: addToList, isLoading: isAdding } = useAddToWatchlist();
  console.log("📥 Requested ID from URL:", id);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getProgramDetails(id, profile._id);
      setProgram(result);
      if (profile?._id && result?._id) {
        await addInteraction(profile._id, result._id, "click");
      }
    };

    fetchData();
  }, [id, profile]);

  const handleAddToList = async () => {
    if (!program || !profile?._id) return;

    await addInteraction(profile._id, program._id, "like");

    addToList({
      userId: profile._id,
      movieId: program._id,
      title: program.title || program.name,
      posterPath: program.poster_path,
    });
  };

  if (!program) return <div className="text-white p-6">Loading...</div>;

  return (
    <div className="relative text-white min-h-screen">
      {/* רקע עם התמונה */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${
            program.backdrop_path || program.poster_path
          })`,
        }}
      />
      {/* שכבת כהות מעל */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black/95 z-0" />

      {/* תוכן */}
      <div className="relative z-10 px-6 py-16 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">
          {program.title || program.name}
        </h1>

        <div className="flex gap-3 items-center mb-6">
          <button
            className="bg-white text-black px-4 py-1 rounded-sm"
            onClick={() => window.alert("Navigate to review...")}
          >
            Review
          </button>
          <button
            className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center"
            onClick={handleAddToList}
            disabled={isAdding}
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>

        <p className="text-gray-300 text-sm mb-6">{program.overview}</p>

        <div className="text-sm text-gray-400">
          <p>
            <span className="text-white">Rating:</span> {program.vote_average} /
            10
          </p>
          <p>
            <span className="text-white">Genres:</span>{" "}
            {(program.genres || []).map((g) => g.name).join(", ")}
          </p>
          <p>
            <span className="text-white">Release Date:</span>{" "}
            {program.release_date || program.first_air_date}
          </p>
          <p>
            <span className="text-white">Language:</span>{" "}
            {program.original_language?.toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MoreInfo;
