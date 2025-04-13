import { useEffect, useState } from "react";
import { getTopRecommendations } from "../api/recommendation";
import { useAuth } from "../../context/authContext";
import Spinner from "../../components/ui/spinner";

export default function TopRecommendations() {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

    if (user?.id) {
      loadRecommendations();
    }
  }, [user?.id]);

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-600 p-4">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Top Recommendations For You</h2>
      {recommendations.length === 0 ? (
        <p>No recommendations found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {recommendations.map((program) => (
            <div key={program._id || program.id} className="bg-white shadow rounded p-2">
              <img
                src={`https://image.tmdb.org/t/p/w500${program.posterPath}`}
                alt={program.title}
                className="w-full h-64 object-cover rounded"
              />
              <div className="mt-2">
                <h3 className="font-semibold text-lg">{program.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-3">{program.overview}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}