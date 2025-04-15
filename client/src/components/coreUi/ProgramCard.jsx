import React from "react";
import { useNavigate } from "react-router-dom";
import { addInteraction } from "../../api/logs";
import { useProfilesList } from "../../hooks/useUserProfiles";

const ProgramCard = ({ program }) => {
  const navigate = useNavigate();
  const { data: profile } = useProfilesList();

  const handleClick = async () => {
    if (profile?._id && program?._id) {
      await addInteraction(profile._id, program._id, "click");
    }
    navigate(`/program/${program._id || program.id}`);
  };

  return (
    <img
      src={`https://image.tmdb.org/t/p/w500${program.poster_path}`}
      alt={program.title || program.name}
      className="min-w-[218px] h-[123px] object-cover cursor-pointer"
      onClick={handleClick}
    />
  );
};

export default ProgramCard;
