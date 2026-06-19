import React, { useState } from "react";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState({
    fullName: "Kalyani",
    email: "kalyani@gmail.com",
    phone: "9876543210",
    joinedDate: "19-Jun-2026",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleEditSave = () => {
    setIsEditing(!isEditing);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">USER PROFILE</h2>

        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="Profile"
          className="profile-img"
        />

        <div className="profile-info">
          <p>
            <strong>Name:</strong>
          </p>
          {isEditing ? (
            <input
              type="text"
              value={user.fullName}
              onChange={(e) =>
                setUser({ ...user, fullName: e.target.value })
              }
            />
          ) : (
            <p>{user.fullName}</p>
          )}

          <p>
            <strong>Email:</strong>
          </p>
          {isEditing ? (
            <input
              type="email"
              value={user.email}
              onChange={(e) =>
                setUser({ ...user, email: e.target.value })
              }
            />
          ) : (
            <p>{user.email}</p>
          )}

      
        

          <p>
            <strong>Phone:</strong>
          </p>
          {isEditing ? (
            <input
              type="text"
              value={user.phone}
              onChange={(e) =>
                setUser({ ...user, phone: e.target.value })
              }
            />
          ) : (
            <p>{user.phone}</p>
          )}

          <p>
            <strong>Joined On:</strong>
          </p>
          <p>{user.joinedDate}</p>
        </div>

        <div className="profile-buttons">
          <button className="edit-btn" onClick={handleEditSave}>
            {isEditing ? "Save Profile" : "Edit Profile"}
          </button>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;