import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Reset previous errors
    setError("");

    // ✅ Frontend validation
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:8080/api/login", {
        email,
        password,
      });

      // ✅ Store only non-sensitive data
      localStorage.setItem("user", JSON.stringify({
        id: res.data.id,
        email: res.data.email,
      }));

      setLoading(false);
      navigate("/dashboard");
    } catch (err) {
      setLoading(false);
      if (err.response?.status === 401) {
        setError("Invalid email or password.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  const goToSignUp = () => {
    navigate("/sign_up");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      <input
        className="border p-2 w-64"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2 w-64"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className={`px-4 py-2 rounded text-white ${
          loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
        }`}
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {error && (
        <div className="flex flex-col items-center mt-2">
          <p className="text-red-600">{error}</p>
          <button className="text-blue-600 underline mt-2" onClick={goToSignUp}>
            Sign Up
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
