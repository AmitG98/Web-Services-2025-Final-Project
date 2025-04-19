import React from "react";
import { addInteraction } from "../../api/logs";
import { useProfilesList } from "../../hooks/useUserProfiles";

const HeroSection = ({ program, onMoreInfoClick }) => {
  const { data: profile } = useProfilesList();

  if (!program) return null;

  const title = program.title || program.name || "Untitled";
  const titleWords = title.split(" ");

  const isLocalImage =
    !program.backdrop_path?.startsWith("http") &&
    !program.backdrop_path?.startsWith("/");
  const imageUrl = isLocalImage
    ? `/${program.backdrop_path}`
    : `https://image.tmdb.org/t/p/original${program.backdrop_path}`;

  const handleMoreInfoClick = async () => {
    if (profile?._id && (program?._id || program?.id || program?.tmdbId)) {
      const programIdForLog = program._id || program.id || program.tmdbId;
      try {
        await addInteraction(profile._id, programIdForLog, "click");
      } catch (err) {
        console.error(
          "❌ Failed to log click interaction from HeroSection:",
          err
        );
      }
    }
    onMoreInfoClick?.(program);
  };

  return (
    <div
      className="relative h-[85vh] w-full bg-cover bg-center flex items-center"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(20,20,20,1), rgba(20,20,20,0.2)), url(${imageUrl})`,
      }}
    >
      <div className="pl-8 sm:pl-16 md:pl-24 lg:pl-32 max-w-2xl text-left pt-70 sm:pt-48">
        {/* Netflix subtitle */}
        <p className="text-lg text-balance font-bold tracking-widest text-[#e50914] mb-1">
          N <span className="text-white">SERIES</span>
        </p>

        {/* Title */}
        <div
          className="text-white font-extrabold text-[2rem] sm:text-[2.8rem] leading-[1.1] tracking-wider"
          style={{ fontFamily: "Anton, sans-serif" }}
        >
          {titleWords.length > 4
            ? titleWords
                .reduce((rows, word, index) => {
                  if (index % 2 === 0) {
                    rows.push([word]);
                  } else {
                    rows[rows.length - 1].push(word);
                  }
                  return rows;
                }, [])
                .map((pair, idx) => (
                  <div key={idx} className="uppercase">
                    {pair.join(" ")}
                  </div>
                ))
            : titleWords.map((word, index) => (
                <div key={index} className="uppercase">
                  {word}
                </div>
              ))}
        </div>

        {/* Overview */}
        <p className="mt-4 text-sm sm:text-base text-gray-300 leading-snug max-w-[90vw] sm:max-w-[85vw] lg:max-w-[75vw]">
          {program.overview}
        </p>

        {/* More Info Button */}
        <button
          // onClick={() => onMoreInfoClick?.(program)}
          onClick={handleMoreInfoClick}
          className="mt-6 flex items-center gap-2 px-5 py-2 bg-gray-300 bg-opacity-20 hover:bg-opacity-40 text-white text-sm font-medium rounded-md transition"
        >
          <img src="/Info.png" alt="info" className="w-4 h-4" />
          More Info
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
