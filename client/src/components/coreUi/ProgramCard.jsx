import React from "react";

const ProgramCard = ({ program, onClick }) => {
  return (
    <div
      className="relative w-[218px] h-[123px] cursor-pointer overflow-hidden rounded-lg shadow-md transition-transform hover:scale-105"
      onClick={onClick}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${program.poster_path}`}
        alt={program.title || program.name}
        className="object-cover w-full h-full"
      />
    </div>
  );
};

export default ProgramCard;
