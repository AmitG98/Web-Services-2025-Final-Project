import React from "react";
// import { useNavigate } from "react-router-dom";
import { addInteraction } from "../../api/logs";
import { useProfilesList } from "../../hooks/useUserProfiles";

const ProgramCard = ({ program, onClick }) => {
  // const navigate = useNavigate();
  const { data: profile } = useProfilesList();

  const handleClick = async () => {
    if (profile?._id && program?._id) {
      await addInteraction(profile._id, program._id, "click");
    }
    console.log("🧩 program object in ProgramCard:", program);
    // const id = program.id; // רק TMDB ID
    // console.log("🧩 TMDB ID in ProgramCard:", id);
    // navigate(`/program/${id}`);
    onClick?.(program);
  };

  const imageUrl =
  program.posterPath;

  // console.log("🧩 Image Debug:", {
  //   title: program.title || program.name,
  //   posterPath: program.posterPath,
  //   rawPoster: program.poster_path,
  //   fallbackUsed: !program.posterPath && !program.poster_path,
  //   imageUrl,
  // });
  
  return (
    <img
      src={imageUrl}
      alt={program.title || program.name}
      className="min-w-[218px] h-[123px] object-cover cursor-pointer rounded hover:scale-105 transition-transform"
      onClick={handleClick}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = "/fallback-poster.png";
      }}
    />
  );
};

export default ProgramCard;
