import { useEffect, useState, useRef } from "react";
import { getTopRecommendations } from "../api/recommendation";
import { useAuth } from "../../context/authContext";
import Spinner from "../../components/ui/spinner";
import MoreInfo from "../../components/MoreInfo";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

export default function TopRecommendations() {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [scrollPos, setScrollPos] = useState(0);
  const scrollRef = useRef();
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [moreInfoOpen, setMoreInfoOpen] = useState(false);

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        const data = await getTopRecommendations(user?.id);
        setRecommendations(data || []);
      } catch (err) {
        console.error("Error fetching recommendations:", err);
        setError("Failed to load recommendations.");
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) loadRecommendations();
  }, [user?.id]);

  const handlePosterClick = (program) => {
    setSelectedProgram(program);
    setMoreInfoOpen(true);
  };

  const handleMoreInfoClose = () => {
    setMoreInfoOpen(false);
    setSelectedProgram(null);
  };

  const handleScroll = (direction) => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollAmount = 800;
    const newScroll = direction === "left"
      ? scrollPos - scrollAmount
      : scrollPos + scrollAmount;

    scrollContainer.scrollTo({ left: newScroll, behavior: "smooth" });
    setScrollPos(newScroll);
  };

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-600 p-4">{error}</p>;

  return (
    <div className="p-6 relative">
      <h2 className="text-2xl font-bold mb-4 text-white">
        Top Recommendations For You
      </h2>

      {scrollPos > 0 && (
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/60 text-white z-10 p-2 hover:bg-black/80"
          onClick={() => handleScroll("left")}
        >
          <ChevronLeft fontSize="large" />
        </button>
      )}

      {recommendations.length > 4 && (
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/60 text-white z-10 p-2 hover:bg-black/80"
          onClick={() => handleScroll("right")}
        >
          <ChevronRight fontSize="large" />
        </button>
      )}

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide pb-4"
        onScroll={(e) => setScrollPos(e.target.scrollLeft)}
      >
        {recommendations.map((program) => (
          <div
            key={program._id || program.id}
            onClick={() => handlePosterClick(program)}
            className="min-w-[200px] bg-white shadow rounded overflow-hidden cursor-pointer hover:scale-105 transition"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${program.posterPath}`}
              alt={program.title}
              className="w-full h-[280px] object-cover"
            />
            <div className="p-2">
              <h3 className="font-semibold text-lg truncate">{program.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-3">
                {program.overview}
              </p>
            </div>
          </div>
        ))}
      </div>
      {selectedProgram && (
        <MoreInfo
          open={moreInfoOpen}
          onClose={handleMoreInfoClose}
          media={selectedProgram}
        />
      )}
    </div>
  );
}
