import React, { useState } from "react";
import Spinner from "../components/ui/spinner";
import MainHeader from "../components/coreUi/MainHeader";
import MainFooter from "../components/coreUi/MainFooter";
import { useProgramList } from "../hooks/useProgramList";
import { useMyMovieList } from "../hooks/useMyMovieList";
import MoreInfo from "./MoreInfo";
import ProgramCard from "../components/coreUi/ProgramCard";

const ProgramGridPage = ({ title, query, type = "movie", activePage }) => {
  const [selectedProgram, setSelectedProgram] = useState(null);

  const myListResult = useMyMovieList();
  const programListResult = useProgramList(type);

  const isMyList = query === "myList";
  const {
    data: programData,
    isLoading,
    error,
  } = isMyList ? myListResult : programListResult;

  console.log("📦 Loaded programs:", programData);
  if (programData?.length) {
    console.log(
      "Poster URLs:",
      programData.map((p) => p.posterPath)
    );
  }

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

        {programData?.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {programData.map((program) => (
              <div key={program.tmdbId || program._id || program.id}>
                <ProgramCard
                  program={program}
                  onClick={(program) => {
                    console.log("🖱️ Program clicked:", program);
                    const normalized = {
                      ...program,
                      id: program.programId?.split("-").pop(),
                    };
                    setSelectedProgram(normalized);
                  }}
                />
                <p className="mt-2 text-sm font-medium truncate text-center">
                  {program.title || program.name}
                </p>
              </div>
            ))}
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
