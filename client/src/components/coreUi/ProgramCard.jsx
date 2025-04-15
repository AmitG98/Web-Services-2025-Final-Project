import React from "react";

const ProgramCard = ({ program, onClick }) => {
  return (
    <img
      src={`https://image.tmdb.org/t/p/w500${program.poster_path}`}
      alt={program.title || program.name}
      className="min-w-[218px] h-[123px] object-cover cursor-pointer"
      onClick={onClick}
    />
  );
};

export default ProgramCard;
