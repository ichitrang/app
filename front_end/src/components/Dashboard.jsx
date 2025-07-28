import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Failed to fetch users:", err));
  }, []);

  const goToProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Welcome, {currentUser?.email}</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-6"
        onClick={goToProfile}
      >
        View My Profile
      </button>

      <h2 className="text-xl mb-2">All Users</h2>
      <ul className="list-disc pl-6">
        {users.map((user) => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
