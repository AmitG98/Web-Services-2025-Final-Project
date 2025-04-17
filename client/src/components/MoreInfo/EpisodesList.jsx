import React, { useState } from "react";
import { useSeriesEpisodes } from "../../hooks/useSeriesEpisodes";

const EpisodesList = ({ seriesId, seasons = [] }) => {
  const [openSeason, setOpenSeason] = useState(null);

  const toggleSeason = (seasonNumber) => {
    setOpenSeason((prev) => (prev === seasonNumber ? null : seasonNumber));
  };
  <h4 className="text-white text-lg font-semibold mb-2">Episodes</h4>;

  return (
    <div className="w-11/12 mx-auto mt-4 text-left">
      <h4 className="text-white text-lg font-semibold mb-2">Episodes</h4>
      {seasons.map((season) => (
        <SeasonEpisodes
          key={season.season_number}
          seriesId={seriesId}
          seasonNumber={season.season_number}
          seasonName={season.name}
          isOpen={openSeason === season.season_number}
          onToggle={toggleSeason}
        />
      ))}
    </div>
  );
};

const SeasonEpisodes = ({
  seriesId,
  seasonNumber,
  seasonName,
  isOpen,
  onToggle,
}) => {
  const {
    data: episodes,
    isLoading,
    error,
  } = useSeriesEpisodes(seriesId, seasonNumber);

  const handleClick = () => onToggle(seasonNumber);

  return (
    <div className="mb-3 border border-gray-600 rounded-md overflow-hidden">
      <div
        className="bg-gray-800 px-4 py-2 cursor-pointer flex justify-between items-center"
        onClick={handleClick}
      >
        <h5 className="text-white font-medium">{seasonName}</h5>
        <span className="text-white text-sm">{isOpen ? "▲" : "▼"}</span>
      </div>

      {isOpen && (
        <div className="bg-gray-900 px-4 py-2">
          {isLoading && (
            <p className="text-white text-sm">
              Loading season {seasonNumber}...
            </p>
          )}
          {error && (
            <p className="text-red-500 text-sm">
              Error loading season {seasonNumber}
            </p>
          )}
          {episodes?.length === 0 && !isLoading && !error && (
            <p className="text-white text-sm italic">No episodes available for this season.</p>
          )}
          {episodes?.length > 0 && (
            <ul className="space-y-1">
              {episodes.map((ep) => (
                <li
                  key={ep.id}
                  className="text-white text-sm border-b border-gray-700 py-1"
                >
                  <strong>Ep {ep.episode_number}:</strong> {ep.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default EpisodesList;
