import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

export default function UpdateInternship() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchApp = async () => {
      try {
        const res = await API.get(`/apps/${id}`);
        setCompany(res.data.company);
        setRole(res.data.role);
        setStatus(res.data.status);
        setLoading(false);
      } catch {
        alert("Failed to load internship");
        navigate("/dashboard");
      }
    };
    fetchApp();
  }, [id, navigate]);

 const handleUpdate = async (e) => {
  e.preventDefault();
  try {
    await API.put(`/apps/update/${id}`, {
      company,
      role,
      status,
    });
    navigate("/dashboard");
  } catch (err) {
    alert("Update failed");
    console.log(err.response?.data);
  }
};


  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleUpdate}
        className="bg-white p-8 rounded shadow w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Update Internship
        </h2>

        <input
          className="w-full p-2 border rounded mb-3"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company"
        />

        <input
          className="w-full p-2 border rounded mb-3"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Role"
        />

        <select
          className="w-full p-2 border rounded mb-4"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Selected</option>
          <option>Rejected</option>
        </select>

        <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
          Save Changes
        </button>

        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="w-full mt-2 text-gray-600"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
