import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <div style={{ padding: "20px" }}>
      <button
        onClick={handleProfileClick}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          marginBottom: "20px",
          cursor: "pointer",
        }}
      >
        Go to My Profile
      </button>

      <h2>All Users</h2>
      {users.length === 0 ? (
        <p>Loading users...</p>
      ) : (
        <ul>
          {users.map((user, idx) => (
            <li key={idx} style={{ marginBottom: "10px" }}>
              <strong>Email:</strong> {user.email} <br />
              <strong>Aadhaar:</strong> {user.aadhar}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Users;
