import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Dashboard() {
  const [apps, setApps] = useState([]);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [statusMap, setStatusMap] = useState({});
  const navigate = useNavigate();

  // Fetch internships
  const fetchApps = async () => {
    try {
      const res = await API.get("/apps");
      setApps(res.data);

      const map = {};
      res.data.forEach((app) => {
        map[app._id] = app.status;
      });
      setStatusMap(map);
    } catch (err) {
      console.error("Error fetching apps");
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  // Add internship
  const addInternship = async () => {
    if (!company || !role) {
      alert("Enter company and role");
      return;
    }

    try {
      await API.post("/apps/add", { company, role });
      setCompany("");
      setRole("");
      fetchApps();
    } catch {
      alert("Error adding internship");
    }
  };

  // Update status
  const updateStatus = async (id) => {
    try {
      await API.put(`/apps/update/${id}`, {
        status: statusMap[id],
      });
      fetchApps();
    } catch {
      alert("Failed to update status");
    }
  };

  // ✅ CLEAN LOGOUT (NO RELOAD)
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Badge color
  const badgeColor = (status) => {
    if (status === "Interview") return "bg-yellow-500";
    if (status === "Selected") return "bg-green-600";
    if (status === "Rejected") return "bg-red-500";
    return "bg-blue-500";
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8 text-black dark:text-white">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Internship Dashboard</h1>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* Add Internship */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-6 flex gap-3">
          <input
            className="border p-2 rounded w-1/3 dark:bg-gray-700"
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          <input
            className="border p-2 rounded w-1/3 dark:bg-gray-700"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          <button
            onClick={addInternship}
            className="bg-indigo-600 text-white px-4 rounded hover:bg-indigo-700"
          >
            Add
          </button>
        </div>

        {/* Internship List */}
        {apps.map((app) => (
          <motion.div
            key={app._id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-4 flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold text-lg">{app.company}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {app.role}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`text-white px-3 py-1 rounded-full text-sm ${badgeColor(
                  statusMap[app._id]
                )}`}
              >
                {statusMap[app._id]}
              </span>

              <select
                value={statusMap[app._id]}
                onChange={(e) =>
                  setStatusMap({
                    ...statusMap,
                    [app._id]: e.target.value,
                  })
                }
                className="border rounded px-2 py-1 text-sm dark:bg-gray-700"
              >
                <option>Applied</option>
                <option>Interview</option>
                <option>Selected</option>
                <option>Rejected</option>
              </select>

              <button
                onClick={() => navigate(`/update/${app._id}`)}
                className="bg-indigo-600 text-white px-3 py-1 rounded"
              >
                Update
              </button>
              <button
                onClick={() => navigate(`/delete/${app._id}`)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>


            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
