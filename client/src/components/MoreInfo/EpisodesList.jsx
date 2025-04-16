import React from "react";
import { useSeriesEpisodes } from "../../hooks/useSeriesEpisodes";

const EpisodesList = ({ seriesId, seasons = [] }) => {
  return (
    <div className="w-11/12 mx-auto mt-4 text-left">
      <h4 className="text-white text-lg font-semibold mb-2">Episodes</h4>
      {seasons.map((season) => (
        <SeasonEpisodes
          key={season.season_number}
          seriesId={seriesId}
          seasonNumber={season.season_number}
          seasonName={season.name}
        />
      ))}
    </div>
  );
};

const SeasonEpisodes = ({ seriesId, seasonNumber, seasonName }) => {
  const {
    data: episodes,
    isLoading,
    error,
  } = useSeriesEpisodes(seriesId, seasonNumber);

  if (isLoading)
    return (
      <p className="text-white text-sm text-left">Loading season {seasonNumber}...</p>
    );
  if (error)
    return (
      <p className="text-red-500 text-sm text-left">
        Error loading season {seasonNumber}
      </p>
    );
  if (!episodes?.length) return null;

  return (
    <div className="mb-4">
      <h5 className="text-white font-medium mb-1">{seasonName}</h5>
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
    </div>
  );
};

export default EpisodesList;
