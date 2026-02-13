import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

export default function DeleteInternship() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApp = async () => {
      try {
        const res = await API.get(`/apps/${id}`);
        setApp(res.data);
        setLoading(false);
      } catch {
        alert("Internship not found");
        navigate("/dashboard");
      }
    };
    fetchApp();
  }, [id, navigate]);

  const handleDelete = async () => {
    try {
      await API.delete(`/apps/${id}`);
      navigate("/dashboard");
    } catch {
      alert("Delete failed");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-4 text-center text-red-600">
          Delete Internship
        </h2>

        <p className="mb-4 text-center">
          Are you sure you want to delete this internship?
        </p>

        <div className="mb-4 text-center">
          <p><b>Company:</b> {app.company}</p>
          <p><b>Role:</b> {app.role}</p>
          <p><b>Status:</b> {app.status}</p>
        </div>

        <button
          onClick={handleDelete}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Yes, Delete
        </button>

        <button
          onClick={() => navigate("/dashboard")}
          className="w-full mt-2 text-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
