import React, { useEffect } from "react";
import { useProfilesList } from "../hooks/useUserProfiles";
import { addInteraction } from "../api/logs"; 

const MoreInfo = ({ program }) => {
  const { data: profile } = useProfilesList();

  useEffect(() => {
    if (profile && program?._id) {
      addInteraction(profile._id, program._id, "click");
    }
  }, [program, profile]);

  if (!program) return null;

  return (
    <div className="text-white p-6 bg-black min-h-screen">
      <div className="max-w-5xl mx-auto">
        <img
          src={`https://image.tmdb.org/t/p/w780${program.backdrop_path || program.poster_path}`}
          alt={program.title || program.name}
          className="w-full h-auto rounded-lg mb-6"
        />
        <h1 className="text-4xl font-bold mb-4">{program.title || program.name}</h1>
        <p className="text-lg text-gray-300 mb-4">{program.overview}</p>
        <div className="text-sm text-gray-400">
          <p>Rating: {program.vote_average} / 10</p>
          <p>Release Date: {program.release_date || program.first_air_date}</p>
        </div>
      </div>
    </div>
  );
};

export default MoreInfo;
