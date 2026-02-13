import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { validatePassword } from "../utils/passwordValidator";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(0);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handlePasswordChange = (value) => {
    setPassword(value);
    const result = validatePassword(value);
    setStrength(result.strength);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    if (strength < 5) {
      setError("Password is too weak");
      return;
    }

    try {
      await API.post("/auth/register", { name, email, password });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

        <input
          className="w-full p-2 border rounded mb-3"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          className="w-full p-2 border rounded mb-3"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 border rounded mb-2"
          placeholder="Password"
          onChange={(e) => handlePasswordChange(e.target.value)}
        />

        {/* Strength Bar */}
        <div className="h-2 w-full bg-gray-200 rounded mb-2">
          <div
            className={`h-2 rounded transition-all ${
              strength <= 2
                ? "bg-red-500 w-1/4"
                : strength === 3
                ? "bg-yellow-400 w-2/4"
                : strength === 4
                ? "bg-blue-500 w-3/4"
                : "bg-green-500 w-full"
            }`}
          ></div>
        </div>

        <p className="text-sm mb-2">
          Strength:{" "}
          {strength <= 2 && "Weak"}
          {strength === 3 && "Medium"}
          {strength === 4 && "Good"}
          {strength === 5 && "Strong"}
        </p>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button className="w-full bg-indigo-600 text-white py-2 rounded mt-3 hover:bg-indigo-700">
          Register
        </button>
      </form>
    </div>
  );
}
