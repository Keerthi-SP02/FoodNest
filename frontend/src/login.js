import React, { useState } from "react";
import bg from "./img5.png";

export default function Login({ switchPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleDisplay, setRoleDisplay] = useState("");

  const handleLogin = () => {
    const data = JSON.parse(localStorage.getItem("userData"));

    if (!data) {
      alert("No registered user found!");
      return;
    }

    if (email === data.email && password === data.password) {
      setRoleDisplay(data.role);
    } else {
      alert("Invalid Login Credentials");
    }
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
          width: "420px",
          padding: "35px",
          borderRadius: "25px",

          background: "rgba(255, 255, 255, 1)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
          border: "1px solid rgba(255,255,255,0.3)",
          backdropFilter: "blur(10px)",
        }}
      >
        <h1 style={{ textAlign: "center",color:"#2287e5ff" }}>NeuroFleetX</h1>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>
       

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "5px",
            borderRadius: "10px",
            border: "1px solid #ccc",
          }}
        />

        <div style={{ marginTop: "15px" }}>
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <button
          onClick={handleLogin}
          style={{
            marginTop: "22px",
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            background: "linear-gradient(to right, #5f7eecff, #326ea7ff)",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Login
        </button>

        {roleDisplay && (
          <p
            style={{
              marginTop: "15px",
              textAlign: "center",
              fontWeight: "bold",
              color: "green",
            }}
          >
            Logged in as: {roleDisplay}
          </p>
        )}

        <p style={{ textAlign: "center", marginTop: "15px" }}>
          Don't have an account?
          <span
            style={{ color: "blue", cursor: "pointer", fontWeight: "bold" }}
            onClick={() => switchPage("register")}
          >
            {" "}
            Register Now
          </span>
        </p>
      </div>
    </div>
  );
}
