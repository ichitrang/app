import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [aadhar, setAadhar] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d{12}$/.test(aadhar)) {
      alert("Invalid Aadhar number. It should be 12 digits.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/register", {
        email,
        password,
        aadhar,
      });

      navigate("/users");
    } catch (error) {
      console.error("Registration failed", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <input
          type="text"
          placeholder="Aadhar Number"
          value={aadhar}
          onChange={(e) => setAadhar(e.target.value)}
          required
        /><br />
        <button type="submit">Register & View Users</button>
      </form>
    </div>
  );
};

export default Login;
