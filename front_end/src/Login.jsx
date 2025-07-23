import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidCreds, setInvalidCreds] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Basic validation to avoid empty login
    if (!email || !password) {
      setInvalidCreds(true);
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/api/login", { email, password });
      // Save user data in localStorage
      localStorage.setItem("user", JSON.stringify(res.data));
      setInvalidCreds(false);
      // Redirect to dashboard after successful login
      navigate("/dashboard");
    } catch (error) {
      // Show invalid credentials error if login fails
      setInvalidCreds(true);
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
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleLogin}
      >
        Login
      </button>

      {invalidCreds && (
        <div className="flex flex-col items-center">
          <p className="text-red-600 mt-2">Invalid credentials or empty fields</p>
          <button className="text-blue-600 underline mt-2" onClick={goToSignUp}>
            Sign Up
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
