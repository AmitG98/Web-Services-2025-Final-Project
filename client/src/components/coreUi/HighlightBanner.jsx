import React from "react";

const HighlightBanner = ({ program }) => {
  if (!program) return null;

  return (
    <section
      className="h-[65vh] w-full bg-cover bg-center text-white flex items-end p-6 sm:p-12"
      style={{ backgroundImage: `url(${program.coverImage || program.image})` }}
    >
      <div className="max-w-2xl bg-black/60 p-6 rounded-md">
        <h2 className="text-3xl font-bold mb-2">{program.title}</h2>
        <p className="text-sm text-gray-200 mb-4 line-clamp-3">
          {program.description || "No description available."}
        </p>
        <button className="bg-white text-black font-semibold py-1 px-4 rounded">
          More Info
        </button>
      </div>
    </section>
  );
};

export default HighlightBanner;