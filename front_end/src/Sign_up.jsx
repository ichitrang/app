import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      const res = await axios.post("http://localhost:8080/api/register", { email, password });
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/dashboard");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <input
        className="mb-2 p-2 border rounded w-64"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="mb-4 p-2 border rounded w-64"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />
      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={handleRegister}
      >
        Register
      </button>
    </div>
  );
};

export default SignUp;
