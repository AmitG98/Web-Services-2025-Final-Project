import { Link } from "react-router-dom";

export default function DataManagement() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Program Management</h2>

      <Link
        to="/admin-dashboard/add-program"
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded"
      >
        + Add New Program
      </Link>
    </div>
  );
}
