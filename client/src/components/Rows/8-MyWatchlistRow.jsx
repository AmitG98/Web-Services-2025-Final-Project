import React from "react";
import { useWatchlist } from "../../hooks/useWatchlist";
import Spinner from "../ui/spinner";
import { v4 as uuid } from "uuid";

const MyWatchlistRow = ({ setSelectedMovie }) => {
  const { data, isLoading, error } = useWatchlist(); // pass userId if needed

  if (isLoading) return <Spinner />;
  if (error) return <div>Couldn't load your watchlist.</div>;

  return (
    <section className="mt-8 w-full">
      <h3 className="font-medium text-[20px] mb-3 relative z-10">Your Watchlist</h3>
      <div className="relative flex items-center w-full">
        <div className="w-full flex gap-4 overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide">
          {data?.map((item) => (
            <img
              key={uuid()}
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={item.title}
              className="min-w-[218px] h-[123px] object-cover rounded cursor-pointer"
              onClick={() => setSelectedMovie(item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyWatchlistRow;
