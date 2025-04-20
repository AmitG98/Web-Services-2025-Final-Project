import React, { useState } from "react";
import MainHeader from "../components/coreUi/MainHeader";
import Dropdown from "../components/ui/Dropdown";
import { v4 as uuidv4 } from "uuid";
import { useProgramSearch } from "../hooks/useProgramList";
import ProgramCard from "../components/coreUi/ProgramCard";
import MoreInfo from "./MoreInfo";

const Browse = () => {
  const [selectedLang, setSelectedLang] = useState("All Languages");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedGenre, setSelectedGenre] = useState("All Genres");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSort, setSelectedSort] = useState("Suggested for you");
  const [selectedProgram, setSelectedProgram] = useState(null);

  const languageOptions = [
    "All Languages",
    "English",
    "French",
    "Japanese",
    "Korean",
    "Hebrew",
  ];

  const typeOptions = ["All Types", "Movies", "TV Shows"];
  const sortOptions = ["Suggested for you", "A-Z", "Z-A"];

  const genreOptions = [
    "All Genres",
    { name: "Action", id: 28 },
    { name: "Adventure", id: 12 },
    { name: "Animation", id: 16 },
    { name: "Comedy", id: 35 },
    { name: "Crime", id: 80 },
    { name: "Documentary", id: 99 },
    { name: "Drama", id: 18 },
    { name: "Family", id: 10751 },
    { name: "Fantasy", id: 14 },
    { name: "History", id: 36 },
    { name: "Horror", id: 27 },
    { name: "Music", id: 10402 },
    { name: "Mystery", id: 9648 },
    { name: "Romance", id: 10749 },
    { name: "Science Fiction", id: 878 },
    { name: "TV Movie", id: 10770 },
    { name: "Thriller", id: 53 },
    { name: "War", id: 10752 },
    { name: "Western", id: 37 },
  ];

  const langMap = {
    English: "en",
    French: "fr",
    Japanese: "ja",
    Korean: "ko",
    Hebrew: "he",
  };

  const genreId = genreOptions.find(
    (g) => typeof g === "object" && g.name === selectedGenre
  )?.id;

  const {
    data: programs = [],
    isLoading,
    isError,
  } = useProgramSearch({
    query: searchQuery.trim() || undefined,
    language:
      selectedLang !== "All Languages" && langMap[selectedLang]
        ? langMap[selectedLang]
        : undefined,
    genre: genreId,
    type:
      selectedType === "Movies"
        ? "movie"
        : selectedType === "TV Shows"
        ? "tv"
        : undefined,
  });

  const sortedPrograms = [...programs];
  if (selectedSort === "A-Z") {
    sortedPrograms.sort((a, b) =>
      (a.title || a.name || "").localeCompare(b.title || b.name || "")
    );
  } else if (selectedSort === "Z-A") {
    sortedPrograms.sort((a, b) =>
      (b.title || b.name || "").localeCompare(a.title || a.name || "")
    );
  }

  return (
    <div className="bg-black min-h-screen w-screen p-0 overflow-x-hidden">
      <div className="fixed top-0 left-0 w-full z-50">
        <MainHeader activePage="browse" />
      </div>

      {/* Filters Header */}
      <div className="w-full px-6 mt-24 text-white space-y-4">
        {/* Title + Search */}
        <div className="flex justify-between items-center px-3">
          <h1 className="font-semibold text-3xl">Browse</h1>
          <input
            type="text"
            placeholder="Search programs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white text-black px-3 py-1 rounded w-64"
          />
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap gap-4 px-3">
          <Dropdown
            options={languageOptions}
            selectedOption={selectedLang}
            onSelect={setSelectedLang}
            className="w-40"
          />

          <Dropdown
            options={typeOptions}
            selectedOption={selectedType}
            onSelect={setSelectedType}
            className="w-40"
          />

          <Dropdown
            options={genreOptions.map((g) =>
              typeof g === "object" ? g.name : g
            )}
            selectedOption={selectedGenre}
            onSelect={setSelectedGenre}
            className="w-40"
          />

          <Dropdown
            options={sortOptions}
            selectedOption={selectedSort}
            onSelect={setSelectedSort}
            className="w-40"
          />
        </div>
      </div>

      {/* Results Grid – centered container, left-aligned items */}
      <div className="w-full flex justify-center mt-16 px-5">
        <div className="flex flex-wrap justify-start gap-4 max-w-6xl w-full">
          {isLoading ? (
            <div className="text-white">Loading...</div>
          ) : isError ? (
            <div className="text-red-500">Error fetching results</div>
          ) : sortedPrograms?.length > 0 ? (
            sortedPrograms.map((program) => (
              <div className="w-52 h-auto" key={uuidv4()}>
                <ProgramCard
                  program={program}
                  onClick={() => {
                    const id = program.id || program.tmdbId || program._id;
                    setSelectedProgram({ ...program, id });
                  }}
                />
              </div>
            ))
          ) : (
            <div className="text-white">No programs found</div>
          )}
        </div>
      </div>

      {/* More Info Popup */}
      {selectedProgram && (
        <MoreInfo
          program={selectedProgram}
          isOpen={true}
          onClose={() => setSelectedProgram(null)}
        />
      )}
    </div>
  );
};

export default Browse;
