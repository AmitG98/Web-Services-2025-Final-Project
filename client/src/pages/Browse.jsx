import React, { useState } from "react";
import MainHeader from "../components/coreUi/MainHeader";
import Dropdown from "../components/ui/Dropdown";
import { v4 as uuidv4 } from "uuid";
import { useProgramList } from "../hooks/useProgramList";

const Browse = () => {
  const [selectedLang, setSelectedLang] = useState("English");
  const [selectedPreference, setSelectedPreference] = useState("Original Language");
  const [selectedSort, setSelectedSort] = useState("Suggested for you");

  const languageOptions = [
    "English",
    "Mandarin Chinese",
    "Hindi",
    "Spanish",
    "French",
    "Standard Arabic",
    "Bengali",
  ];

  const preferenceOptions = ["Original Language", "Dubbing", "Subtitles"];
  const sortOptions = ["Suggested for you", "A-Z", "Z-A"];

  const {
    data: programs,
    isLoading,
    isError,
  } = useProgramList("movie"); // ניתן להרחיב לפילטרים אם תעדכני את ה-hook

  if (isLoading) return <div className="text-white p-5">Loading...</div>;
  if (isError) return <div className="text-red-500 p-5">Error fetching results</div>;

  return (
    <div className="bg-black min-h-screen w-screen p-0 overflow-x-hidden">
      <div className="fixed top-0 left-0 w-full z-50">
        <MainHeader activePage="browse" />
      </div>

      {/* Filters Header */}
      <div className="w-full px-6 mt-24 text-white">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center flex-wrap gap-4">
          <h1 className="font-semibold text-3xl px-3">Browse</h1>

          <div className="flex flex-wrap gap-4 items-center">
            <p className="font-light">Select your preferences</p>

            <Dropdown
              options={preferenceOptions}
              selectedOption={selectedPreference}
              onSelect={setSelectedPreference}
            />

            <Dropdown
              options={languageOptions}
              selectedOption={selectedLang}
              onSelect={setSelectedLang}
            />

            <div className="flex flex-row items-center gap-1">
              <span className="text-gray-200 text-sm">Sort by</span>
              <Dropdown
                options={sortOptions}
                selectedOption={selectedSort}
                onSelect={setSelectedSort}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="w-full flex flex-wrap justify-center gap-4 mt-16 px-5">
        {programs?.length > 0 ? (
          programs.map((program) => (
            <div className="w-52 h-auto" key={uuidv4()}>
              <img
                src={`https://image.tmdb.org/t/p/w500${program.poster_path}`}
                alt={program.title}
                className="min-w-[218px] h-[123px] object-cover rounded cursor-pointer"
              />
            </div>
          ))
        ) : (
          <div className="text-white">No programs found</div>
        )}
      </div>
    </div>
  );
};

export default Browse;