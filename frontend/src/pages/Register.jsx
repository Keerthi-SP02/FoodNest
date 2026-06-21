import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!agree) {
      alert("Please agree to the Terms & Conditions");
      return;
    }

    try {
      const response = await axios.post(
  `${API_URL}/api/register`,
        {
          fullname,
          email,
          password,
          confirmPassword,
        }
      );

      alert(response.data.message);

      setFullname("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setAgree(false);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration failed"
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
        <div className="row g-0 flex-lg-row-reverse">
          
          <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center bg-light">
            <img
              src="src/assets/Register.png"
              alt="Register"
              className="img-fluid p-4"
              style={{ maxHeight: "450px" }}
            />
          </div>

          <div className="col-lg-6 col-12">
            <div className="p-4 p-md-5">
              <h2 className="fw-bold mb-2">
                Create Account
              </h2>

              <p className="text-muted mb-4">
                Create your account to continue
              </p>

              <form onSubmit={handleRegister}>
                <div className="mb-3">
                  <label className="form-label">
                    Full Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                    value={fullname}
                    onChange={(e) =>
                      setFullname(e.target.value)
                    }
                    required
                  />
                </div>

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
                        setPassword(e.target.value)
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

                <div className="mb-3">
                  <label className="form-label">
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
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) =>
                        setConfirmPassword(
                          e.target.value
                        )
                      }
                      required
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

                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="terms"
                    checked={agree}
                    onChange={(e) =>
                      setAgree(e.target.checked)
                    }
                  />

                  <label
                    className="form-check-label"
                    htmlFor="terms"
                  >
                    I agree to the{" "}
                    <span className="text-primary fw-semibold">
                      Terms & Conditions
                    </span>{" "}
                    and{" "}
                    <span className="text-primary fw-semibold">
                      Privacy Policy
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={!agree}
                >
                  Register
                </button>

                <p className="text-center mt-4 mb-0">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-decoration-none"
                  >
                    Login
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

export default Register;
