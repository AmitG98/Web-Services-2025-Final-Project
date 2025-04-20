import { useState } from "react";
import { createProgram, getTmdbPreview } from "../../api/program";

export default function ProgramForm() {
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    tmdbId: "",
    type: "movie",
    title: "",
    name: "",
    overview: "",
    releaseDate: "",
    posterPath: "",
    backdropPath: "",
    genres: [],
    genreNames: [],
    genreIds: [],
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchPreview = async () => {
    setMessage("");
    const cleanTmdbId = form.tmdbId.replace(/^:/, "");
    try {
      const result = await getTmdbPreview(form.type, cleanTmdbId);
      const data = result.data;
      setForm((prev) => ({
        ...prev,
        title: data.title || data.name || "",
        name: data.name || "",
        overview: data.overview || "",
        releaseDate: data.release_date || data.first_air_date || "",
        posterPath: data.poster_path || "",
        backdropPath: data.backdrop_path || "",
        genreIds: (data.genres || []).map((g) => g.id),
        genreNames: (data.genres || []).map((g) => g.name),
      }));
      setError("");
      setMessage("Fetched successfully from TMDB");
    } catch (err) {
      setMessage("Failed to fetch from TMDB");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      setLoading(true);
      setError("");
      await createProgram(form);
      setMessage("Program created successfully");
      setForm({
        tmdbId: "",
        type: "movie",
        title: "",
        name: "",
        overview: "",
        releaseDate: "",
        posterPath: "",
        backdropPath: "",
        genres: [],
        genreIds: [],
      });
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to create program. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4">Insert New Program</h2>

      {form.posterPath && form.title && form.overview && (
        <div className="mb-10 border rounded p-4 shadow bg-white">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">TMDB Preview</h3>
          <div className="flex gap-6">
            {form.posterPath && (
              <img
                src={`https://image.tmdb.org/t/p/w200${form.posterPath}`}
                alt="Poster"
                className="w-40 rounded shadow"
              />
            )}
            <div>
              <h4 className="text-xl font-bold mb-2">{form.title || form.name}</h4>
              <p className="text-gray-700 text-sm whitespace-pre-wrap">{form.overview}</p>
              {form.releaseDate && (
                <p className="mt-2 text-sm text-gray-600">
                  <strong>Release Date:</strong> {form.releaseDate}
                </p>
              )}
              {Array.isArray(form.genres) && form.genres.length > 0 && (
                <p className="text-sm text-gray-600 mt-1">
                  <strong>Genres:</strong> {form.genres.join(", ")}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="tmdbId"
          value={form.tmdbId}
          onChange={handleChange}
          placeholder="TMDB ID"
          className="w-full border p-2"
          required
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full border p-2"
        >
          <option value="movie">Movie</option>
          <option value="tv">TV Show</option>
        </select>

        <button
          type="button"
          onClick={fetchPreview}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Fetch TMDB Data
        </button>

        <input
          name="title"
          value={form.title || ""}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border p-2"
          required
        />

        <textarea
          name="overview"
          value={form.overview || ""}
          onChange={handleChange}
          placeholder="Overview"
          className="w-full border p-2"
          rows="4"
        />

        <input
          name="releaseDate"
          value={form.releaseDate || ""}
          onChange={handleChange}
          placeholder="Release Date"
          className="w-full border p-2"
        />

        <input
          name="posterPath"
          value={form.posterPath || ""}
          onChange={handleChange}
          placeholder="Poster Path"
          className="w-full border p-2"
        />

        <input
          name="backdropPath"
          value={form.backdropPath || ""}
          onChange={handleChange}
          placeholder="Backdrop Path"
          className="w-full border p-2"
        />

        <input
          value={Array.isArray(form.genreNames) ? form.genreNames.join(", ") : ""}
          disabled
          className="w-full border p-2 text-gray-500 bg-gray-100"
          placeholder="Genres (fetched automatically)"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Program"}
        </button>
      </form>
      {error && (
        <p className="mt-4 text-center text-sm text-red-600">{error}</p>
      )}
      {message && (
        <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
      )}
    </div>
  );
}
