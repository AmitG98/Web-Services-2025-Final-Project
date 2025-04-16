// ProgramForm.jsx
import { useState } from "react";
import { createProgram, getTmdbPreview } from "../../api/program";

export default function ProgramForm() {
  const [form, setForm] = useState({
    tmdbId: "",
    type: "movie",
    title: "",
    overview: "",
    releaseDate: "",
    posterPath: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchPreview = async () => {
    const cleanTmdbId = form.tmdbId.replace(/^:/, "");
    try {
      const data = await getTmdbPreview(form.type, cleanTmdbId);
      setForm({
        ...form,
        title: data.title || data.name,
        overview: data.overview,
        releaseDate: data.release_date || data.first_air_date,
        posterPath: data.poster_path,
      });
    } catch (err) {
      setMessage("TMDB fetch failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createProgram(form);
      setMessage("Program created successfully");
      setForm({ tmdbId: "", type: "movie", title: "", overview: "", releaseDate: "", posterPath: "" });
    } catch (err) {
      setMessage("Failed to create program");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4">Insert New Program</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="tmdbId" value={form.tmdbId} onChange={handleChange} placeholder="TMDB ID (optional)" className="w-full border p-2" />
        <select name="type" value={form.type} onChange={handleChange} className="w-full border p-2">
          <option value="movie">Movie</option>
          <option value="tv">TV Show</option>
        </select>
        <button type="button" onClick={fetchPreview} className="bg-blue-500 text-white px-4 py-2 rounded">
          Fetch TMDB Data
        </button>

        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full border p-2" required />
        <textarea name="overview" value={form.overview} onChange={handleChange} placeholder="Overview" className="w-full border p-2" rows="4" />
        <input name="releaseDate" value={form.releaseDate} onChange={handleChange} placeholder="Release Date" className="w-full border p-2" />
        <input name="posterPath" value={form.posterPath} onChange={handleChange} placeholder="Poster Path" className="w-full border p-2" />

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded" disabled={loading}>
          {loading ? "Creating..." : "Create Program"}
        </button>
      </form>

      {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
    </div>
  );
}