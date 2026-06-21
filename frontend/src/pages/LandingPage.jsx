import bgImage from "../assets/LandingPage.png";
import {Link} from "react-router-dom";
function LandingPage() {
  return (
    <div
      className="vh-100 d-flex flex-column justify-content-center align-items-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="text-center text-dark">
        <h1 className="display-1 fw-bold">FoodNest</h1>

        <p className="fs-4">
          Giving your food a home, not a mystery ending.
        </p>

        <p className="lead">
          Track    Manage    Save    Consume
        </p>

        <div className="mt-4">
          <Link to="/register" className="btn btn-success me-3 px-2 w-25">Register</Link>
          <Link to="/login" className="btn btn-warning px-2 w-25">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;