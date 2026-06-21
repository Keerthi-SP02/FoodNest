import { useState, useEffect } from "react";

function Profile() {
  const [showPasswordFields, setShowPasswordFields] =
    useState(false);

  const [user, setUser] = useState({});

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);
 const [fullname, setFullname] = useState("");
const [editProfile, setEditProfile] = useState(false);
   const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");


const response = await fetch(
  `${API_URL}/api/profile`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

        const data = await response.json();
setUser(data);
setFullname(data.fullname || "");
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/api/change-password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            newPassword,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message);

        setNewPassword("");
        setConfirmPassword("");
        setShowPasswordFields(false);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to update password");
    }
  };
  const handleUpdateProfile = async () => {
  try {
    const token = localStorage.getItem("token");

   const response = await fetch(
  `${API_URL}/api/update-profile`,
  {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      fullname,
    }),
  }
);

    const data = await response.json();
if (response.ok) {
  const updatedUser = {
    ...user,
    fullname,
  };

  setUser(updatedUser);

  localStorage.setItem(
    "user",
    JSON.stringify(updatedUser)
  );

  setEditProfile(false);
  alert(data.message);
}else {
      alert(data.message);
    }
  } catch (error) {
    console.log(error);
  }
};
  

  return (
    <div className="container-fluid p-4">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-xl-7">
          <div className="card shadow border-0">
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="Profile"
                  className="rounded-circle border"
                  width="100"
                  height="100"
                />

                <h3 className="mt-2 text-success fw-bold">
                  My Profile
                </h3>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">
                    Name
                  </label>

                <input
  type="text"
  className="form-control"
  value={fullname}
  readOnly={!editProfile}
  onChange={(e) => setFullname(e.target.value)}
/>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">
                    Email
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    value={user.email || ""}
                    readOnly
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">
                    User ID
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    value={user._id || ""}
                    readOnly
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">
                    Joined On
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    value={
                      user.createdAt
                        ? new Date(
                            user.createdAt
                          ).toLocaleDateString()
                        : ""
                    }
                    readOnly
                  />
                </div>
              </div>

              {showPasswordFields && (
                <>
                  <hr />

                  <h5 className="text-primary mb-3">
                    Change Password
                  </h5>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">
                        New Password
                      </label>

                      <div className="input-group">
                        <input
                          type={
                            showNewPassword
                              ? "text"
                              : "password"
                          }
                          className="form-control"
                          placeholder="Enter New Password"
                          value={newPassword}
                          onChange={(e) =>
                            setNewPassword(
                              e.target.value
                            )
                          }
                        />

                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() =>
                            setShowNewPassword(
                              !showNewPassword
                            )
                          }
                        >
                          {showNewPassword
                            ? "Hide"
                            : "Show"}
                        </button>
                      </div>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">
                        Confirm Password
                      </label>

                      <div className="input-group">
                        <input
                          type={
                            showConfirmPassword
                              ? "text"
                              : "password"
                          }
                          className="form-control"
                          placeholder="Confirm New Password"
                          value={confirmPassword}
                          onChange={(e) =>
                            setConfirmPassword(
                              e.target.value
                            )
                          }
                        />

                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() =>
                            setShowConfirmPassword(
                              !showConfirmPassword
                            )
                          }
                        >
                          {showConfirmPassword
                            ? "Hide"
                            : "Show"}
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}

             <div className="d-flex justify-content-center gap-3 mt-3">

  <button
    type="button"
    className={`btn ${
      editProfile ? "btn-success" : "btn-warning"
    }`}
    onClick={() => {
      if (editProfile) {
        handleUpdateProfile();
      } else {
        setEditProfile(true);
      }
    }}
  >
    {editProfile ? "Save Profile" : "Edit Profile"}
  </button>

  {showPasswordFields && (
    <button
      type="button"
      className="btn btn-success px-4"
      onClick={handleChangePassword}
    >
      Update Password
    </button>
  )}

  <button
    type="button"
    className={`btn ${
      showPasswordFields
        ? "btn-secondary"
        : "btn-primary"
    }`}
    onClick={() => {
      setShowPasswordFields(!showPasswordFields);

      if (showPasswordFields) {
        setNewPassword("");
        setConfirmPassword("");
      }
    }}
  >
    {showPasswordFields
      ? "Cancel"
      : "Change Password"}
  </button>

</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
