import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d{12}$/.test(aadhar)) {
      setError(true);
      setMessage("Invalid Aadhar number");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, aadhar }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("loggedInUser", JSON.stringify(data));
        setMessage("Registered successfully!");
        setError(false);
        navigate("/users");
      } else {
        setMessage(data.message || "Registration failed");
        setError(true);
      }
    } catch (err) {
      setMessage("Something went wrong");
      setError(true);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: "20px" }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br /><br />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />
        <input
          type="text"
          value={aadhar}
          placeholder="Aadhar Number"
          onChange={(e) => setAadhar(e.target.value)}
          required
        /><br /><br />
        <button type="submit">Register</button>
      </form>
      {message && (
        <p style={{ color: error ? "red" : "green", marginTop: "10px" }}>{message}</p>
      )}
    </motion.div>
  );
};

export default Login;
