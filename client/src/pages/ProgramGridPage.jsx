// pages/ProgramGridPage.jsx
import React, { useState, useEffect } from "react";
import Spinner from "../components/ui/spinner";
import MainHeader from "../components/coreUi/MainHeader";
import MainFooter from "../components/coreUi/MainFooter";
import MoreInfo from "./MoreInfo";
import ProgramCard from "../components/coreUi/ProgramCard";
import { useMyMovieList } from "../hooks/useMyMovieList";
import { useNewAndPopularList } from "../hooks/useProgramList";

const ProgramGridPage = ({ query, title, activePage }) => {
  const [selectedProgram, setSelectedProgram] = useState(null);

  const isMyList = query === "myList";
  const isNewAndPopular = query === "newAndPopular";

  const {
    data: myListData = [],
    isLoading: isMyListLoading,
    error: myListError,
  } = useMyMovieList();

  const {
    data: popularData = [],
    isLoading: isPopularLoading,
    error: popularError,
  } = useNewAndPopularList();

  const programData = isMyList ? myListData : popularData;
  const isLoading = isMyList ? isMyListLoading : isPopularLoading;
  const error = isMyList ? myListError : popularError;

  useEffect(() => {
    setSelectedProgram(null);
  }, [query]);

  const seenKeys = new Set();
  const uniquePrograms = programData.filter((program) => {
    const key = `${program.type || "unknown"}-${program.tmdbId || program._id || program.id}`;
    if (seenKeys.has(key)) return false;
    seenKeys.add(key);
    return true;
  });

  if (isLoading) return <Spinner />;
  if (error)
    return <div className="text-red-500 px-8">Error fetching content.</div>;

  return (
    <div className="min-h-screen text-white bg-[#141414] overflow-x-hidden relative">
      <div className="fixed top-0 left-0 w-full z-50">
        <MainHeader activePage={activePage} />
      </div>

      <div className="pt-24 px-6 md:px-20">
        <h3 className="font-semibold text-2xl mb-6">{title}</h3>

        {uniquePrograms.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {uniquePrograms.map((program, index) => {
              const key = `${program.type || "unknown"}-${program.tmdbId || program._id || program.id || index}`;
              return (
                <div key={key}>
                  <ProgramCard
                    program={program}
                    onClick={() => {
                      const normalized = {
                        ...program,
                        id:
                          program.programId?.split("-").pop() ||
                          program.tmdbId ||
                          program._id ||
                          index,
                      };
                      setSelectedProgram(normalized);
                    }}
                  />
                  <p className="mt-2 text-sm font-medium truncate text-left">
                    {program.title || program.name}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-white text-sm">No content to show.</p>
        )}
      </div>

      {selectedProgram && (
        <MoreInfo
          program={selectedProgram}
          isOpen={true}
          onClose={() => setSelectedProgram(null)}
        />
      )}

      <MainFooter />
    </div>
  );
};

export default ProgramGridPage;
