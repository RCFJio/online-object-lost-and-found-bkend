// ProfileIntegration.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  const [name, setName] = useState(localStorage.getItem("userName") || "User Name");
  const [email, setEmail] = useState(localStorage.getItem("userEmail") || "student1@nitconnect.com");
  const [profilePic, setProfilePic] = useState(
    localStorage.getItem("profilePic") || "https://via.placeholder.com/150"
  );
  const [isEditing, setIsEditing] = useState(false);

  // Load user data from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { name, email, profilePic } = response.data;
        setName(name);
        setEmail(email);
        setProfilePic(profilePic || "https://via.placeholder.com/150");
      } catch (error) {
        console.error("Error fetching profile:", error.response?.data || error.message);
      }
    };
    fetchProfile();
  }, []);

  const handleNameChange = (e) => setName(e.target.value);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "/api/profile",
        { name, profilePic },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      localStorage.setItem("userName", name);
      localStorage.setItem("profilePic", profilePic);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message);
    }
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      <div className="profile-pic-container">
        <img src={profilePic} alt="Profile" />
        <label className="upload-btn">
          Change Picture
          <input type="file" accept="image/*" onChange={handleProfilePicChange} />
        </label>
      </div>
      <div className="profile-details">
        <div className="profile-field">
          <label>Name:</label>
          {isEditing ? (
            <input type="text" value={name} onChange={handleNameChange} />
          ) : (
            <p>{name}</p>
          )}
        </div>
        <div className="profile-field">
          <label>Email:</label>
          <p>{email}</p>
        </div>
      </div>
      <div className="profile-actions">
        {isEditing ? (
          <button onClick={handleSave} className="save-btn">
            Save
          </button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="edit-btn">
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
