import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios.get(`http://localhost:8080/api/profile/${user.id}`)
      .then((res) => setProfile(res.data))
      .catch((err) => console.error(err));
  }, [user]);

  return (
    <div className="p-8">
      <h1 className="text-2xl">My Profile</h1>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>ID:</strong> {profile.id}</p>
    </div>
  );
};

export default Profile;
