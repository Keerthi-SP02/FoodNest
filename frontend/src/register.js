import React, { useState } from "react";
import bg from "./img5.png";

export default function Register({ switchPage }) {
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleRegister = () => {
    if (!role || !gender || !mobile || !email || !password || !confirmPass) {
      alert("Please fill all details");
      return;
    }

    if (mobile.length !== 10) {
      alert("Mobile number must be exactly 10 digits");
      return;
    }

    if (password !== confirmPass) {
      alert("Passwords do not match");
      return;
    }

    const user = { role, gender, mobile, email, password };
    localStorage.setItem("userData", JSON.stringify(user));
    alert("Registration Successful!");
    switchPage("login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backdropFilter: "blur(2px)",
      }}
    >
      <div
        style={{
          width: "450px",
          padding: "35px",
          borderRadius: "25px",
          background: "rgba(255,255,255,0.95)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        }}
      >
      <h1
  style={{
    textAlign: "center",
    color: "#2287e5e5",
    marginBottom: "5px",
  }}
>
  NeuroFleetX
</h1>

<h2
  style={{
    textAlign: "center",
    marginTop: "0px",
    marginBottom: "15px",
  }}
>
  Register Here
</h2>


        <label>Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ width: "100%", padding: "10px", marginTop: "5px" }}
        >
          <option value="">-- Select Role --</option>
          <option value="Admin">Admin</option>
          <option value="Fleet Manager">Fleet Manager</option>
          <option value="Driver">Driver</option>
          <option value="Customer">Customer</option>
        </select>

        <div style={{ marginTop: "15px" }}>
          <label>Gender</label>
          <div style={{ marginTop: "5px", display: "flex", gap: "20px" }}>
            <label>
              <input
                type="radio"
                value="Male"
                checked={gender === "Male"}
                onChange={() => setGender("Male")}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                value="Female"
                checked={gender === "Female"}
                onChange={() => setGender("Female")}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                value="Other"
                checked={gender === "Other"}
                onChange={() => setGender("Other")}
              />
              Other
            </label>
          </div>
        </div>

        <div style={{ marginTop: "15px" }}>
          <label>Mobile Number</label>
          <input
            type="text"
            placeholder="Enter Mobile Number"
            value={mobile}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d{0,10}$/.test(value)) {
                setMobile(value);
              }
            }}
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <div style={{ marginTop: "15px" }}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <div style={{ marginTop: "15px" }}>
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <div style={{ marginTop: "15px" }}>
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Re-enter Password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <button
          onClick={handleRegister}
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            background: "linear-gradient(to right, #4a62e8ff, #577b98ff)",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            border: "none",
          }}
        >
          Register
        </button>

        <p style={{ textAlign: "center", marginTop: "10px" }}>
          Already have an account?
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => switchPage("login")}
          >
            {" "}
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
