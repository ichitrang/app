import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch users", error);
      });
  }, []);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh"
    }}>
      <h2>Registered Users</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {users.map((user, index) => (
          <li key={index} style={{
            padding: "10px",
            margin: "10px",
            border: "1px solid gray",
            borderRadius: "8px",
            width: "300px",
            textAlign: "center"
          }}>
            <strong>Email:</strong> {user.email}<br />
            <strong>Aadhar:</strong> {user.aadhar}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
