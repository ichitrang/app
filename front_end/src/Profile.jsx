import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    setUser(loggedUser);
  }, []);

  if (!user) return <div style={{ padding: "20px" }}>Loading...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Profile</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Aadhaar:</strong> {user.aadhar}</p>
    </div>
  );
};

export default Profile;
