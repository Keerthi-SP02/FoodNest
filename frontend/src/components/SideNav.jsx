import { Link, useNavigate } from "react-router-dom";

function SideNav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div
      className="text-white p-4 h-100"
      style={{
        backgroundColor: "#1B4332",
        minHeight:"100vh"
       
      }}
    >
      <h2 className="text-warning fw-bold mb-4">
        Dashboard
      </h2>

      <div className="d-flex flex-column">
        <Link
          to="/home"
          className="text-white text-decoration-none mb-3"
        >
          Home
        </Link>

        <Link
          to="/about"
          className="text-white text-decoration-none mb-3"
        >
          About
        </Link>

        <Link
          to="/contact"
          className="text-white text-decoration-none mb-3"
        >
          Contact
        </Link>

        <hr />

        <Link
          to="/courses"
          className="text-white text-decoration-none mb-3"
        >
          Food Inventory
        </Link>

        <Link
          to="/profile"
          className="text-white text-decoration-none mb-3"
        >
          Profile
        </Link>

        <button
          className="btn btn-danger mt-3"
          style={{ width: "90px" }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default SideNav;