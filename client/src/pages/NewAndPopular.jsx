import React, { useState } from "react";
import Spinner from "../components/ui/spinner";
import Navbar from "../components/Navbar";
import MainFooter from "../components/coreUi/MainFooter";
import { useProgramList } from "../hooks/useProgramList";
import MoreInfo from "./MoreInfo";

const NewAndPopular = () => {
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const { data: newestMovies, isLoading, error } = useProgramList("movie", "newest");

  const handleMovieClick = (id) => {
    setSelectedMovieId(id);
  };

  if (isLoading) return <Spinner />;
  if (error) return <div className="text-red-500 px-8">Error fetching new releases.</div>;

  return (
    <div className="min-h-screen text-white bg-[#141414] overflow-x-hidden">
      <Navbar />

      <div className="mt-8 px-6 md:px-20">
        <h3 className="font-semibold text-2xl mb-6">New & Popular</h3>

        {newestMovies?.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {newestMovies.map((movie) => (
              <div
                key={movie.id}
                className="cursor-pointer flex flex-col"
                onClick={() => handleMovieClick(movie.id)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title || "Movie Poster"}
                  className="min-w-[160px] sm:min-w-[180px] md:min-w-[218px] h-[120px] md:h-[123px] object-cover rounded hover:scale-105 transition-transform"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/fallback-poster.png";
                  }}
                />
                <p className="mt-2 text-sm font-medium truncate">{movie.title}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white text-sm">No new content available at the moment.</p>
        )}
      </div>

      {selectedMovieId && (
        <MoreInfo
          movie={selectedMovieId}
          isOpen={true}
          onClose={() => setSelectedMovieId(null)}
        />
      )}

      <MainFooter />
    </div>
  );
};

export default NewAndPopular;