import React from "react";
import { useExtraProgramInfo } from "../../hooks/useExtraProgramInfo";

const ExtraProgramDetails = ({ programId, type }) => {
  const { data, isLoading, error } = useExtraProgramInfo(type, programId);

  if (isLoading) return <p className="text-white text-sm text-left">Loading extra info...</p>;
  if (error) return <p className="text-red-500 text-sm text-left">Error loading extra info.</p>;
  if (!data) return null;

  return (
    <div className="w-11/12 mx-auto mt-10 text-left">
      <h4 className="text-white text-2xl font-semibold mb-4">More from this Show</h4>

      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
        {data.images.map((img, index) => (
          <img
            key={index}
            src={`https://image.tmdb.org/t/p/w500${img.file_path}`}
            alt={`extra-${index}`}
            className="h-40 w-auto object-cover rounded-md shadow-md flex-shrink-0"
          />
        ))}
      </div>

      <div className="mt-3">
        <h5 className="text-white text-xl font-semibold mb-2">Production Team</h5>
        <div className="flex flex-col gap-1">
          {data.productionTeam.slice(0, 6).map((person) => (
            <div key={person.credit_id} className="text-sm text-white">
              <span className="font-medium">{person.name}</span>{" "}
              <span className="text-gray-400">– {person.job}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExtraProgramDetails;
