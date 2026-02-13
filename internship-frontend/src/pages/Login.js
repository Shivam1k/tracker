import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard"); // 🔥 redirect
    } catch (err) {
      setError(err.response?.data?.msg || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <input
          type="email"
          className="w-full p-2 border rounded mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 border rounded mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded mt-4 text-white ${
            loading
              ? "bg-gray-400"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm mt-4">
          New user?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-indigo-600 font-semibold hover:underline"
          >
            Register
          </button>
        </p>
      </form>
    </div>
  );
}
