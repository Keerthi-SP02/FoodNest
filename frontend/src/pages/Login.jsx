import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../assets/login.png";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const API_URL=import.meta.env.VITE_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_URL}/api/login`,
        { email, password }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert(response.data.message);
      navigate("/home");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
      }}
    >
      <div
        className="card shadow border-0 w-100"
        style={{ maxWidth: "1000px" }}
      >
        <div className="row g-0">
          
     
          <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center bg-light">
            <img src={loginImg} alt="Login"
              className="img-fluid p-4"
              style={{ maxHeight: "650px" }}
            />
          </div>

 
          <div className="col-lg-6 col-12">
            <div className="p-4 p-md-5">
              <h2 className="fw-bold mb-2">
                Welcome Back
              </h2>

              <p className="text-muted mb-4">
                Login to continue
              </p>

              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label">
                    Email
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Password
                  </label>

                  <div className="input-group">
                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      className="form-control"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) =>
                        setPassword(
                          e.target.value
                        )
                      }
                      required
                    />

                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                    >
                      {showPassword
                        ? "Hide"
                        : "Show"}
                    </button>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="remember"
                    />

                    <label
                      className="form-check-label"
                      htmlFor="remember"
                    >
                      Remember me
                    </label>
                  </div>

                  <Link
                    to="#"
                    className="text-decoration-none"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  Login
                </button>

                <div className="text-center my-3 text-muted">
                  OR
                </div>

                <button
                  type="button"
                  className="btn btn-outline-dark w-100"
                >
                  Login with Google
                </button>

                <p className="text-center mt-4 mb-0">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-decoration-none"
                  >
                    Register
                  </Link>
                </p>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;
