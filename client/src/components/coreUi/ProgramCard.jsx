import React from "react";
import { addInteraction } from "../../api/logs";
import { useProfilesList } from "../../hooks/useUserProfiles";

const ProgramCard = ({ program, onClick }) => {
  const { data: profile } = useProfilesList();

  const handleClick = async () => {
    console.log("🧩 [ProgramCard] program object:", program);
    const id = program?.id || program?.programId?.split("-").pop() || program?.tmdbId;
    
    if (!id) {
      console.warn("⚠️ [ProgramCard] Missing usable ID. Can't proceed.");
      return;
    }
  
    const normalizedProgram = { ...program, id };

    if (profile?._id && (program?._id || program?.id || program?.tmdbId)) {
      const programIdForLog = program._id || program.id || program.tmdbId;
      try {
        await addInteraction(profile._id, programIdForLog, "click");
      } catch (err) {
        console.error("❌ Failed to log click interaction:", err);
      }
    }
    onClick?.(normalizedProgram);
  };

  const imageUrl = program.posterPath;

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
      className="min-w-[218px] h-[123px] object-cover cursor-pointer rounded-sm hover:scale-105 transition-transform"
      onClick={handleClick}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = "/fallback-poster.png";
      }}
    />
  );
};

export default ProgramCard;
