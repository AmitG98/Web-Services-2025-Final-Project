import { useEffect, useState } from "react";
import { fetchLogs } from "../../api/logs";

export default function Logs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadLogs = async () => {
      try {
        const data = await fetchLogs();
        setLogs(data);
      } catch (err) {
        setError("Failed to fetch logs");
      } finally {
        setLoading(false);
      }
    };

    loadLogs();
  }, []);

  if (loading) return <p className="p-4">Loading logs...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">System Logs</h2>
      <div className="overflow-x-auto rounded shadow border">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium">Timestamp</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Action</th>
              <th className="px-4 py-2 text-left text-sm font-medium">User</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Level</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Details</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2 text-xs text-gray-700">
                  {new Date(log.createdAt).toLocaleString()}
                </td>
                <td className="px-4 py-2 text-sm">{log.action}</td>
                <td className="px-4 py-2 text-sm">
                  {log.user?.name || log.user?.username || "System"}
                </td>
                <td className="px-4 py-2 text-sm">
                  {log.level || "info"}
                </td>
                <td className="px-4 py-2 text-sm whitespace-pre-wrap">
                  {typeof log.details === "object"
                    ? JSON.stringify(log.details, null, 2)
                    : log.details}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
