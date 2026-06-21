import { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import homebg from "../assets/homebg.png";

function Home() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetchFoods();
  }, []);
const API_URL = import.meta.env.VITE_API_URL;
  const fetchFoods = async () => {
    try {
      const res = await axios.get(
  `${API_URL}/api/items`
);
      setFoods(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const totalFoods = foods.length;

  const freshItems = foods.filter(
    (food) => food.quantity > 10
  ).length;

  const expiringSoon = foods.filter((food) => {
    const expiry = new Date(food.expiryDate);
    const today = new Date();

    const diffDays = Math.ceil(
      (expiry - today) / (1000 * 60 * 60 * 24)
    );

    return diffDays > 0 && diffDays <= 7;
  }).length;

  const expiredItems = foods.filter(
    (food) => new Date(food.expiryDate) < new Date()
  ).length;

  return (
    <div className="container-fluid vh-90 overflow-hidden px-0 m-0 mx-auto">
      <div
        className="row align-items-center"
        style={{ height: "55vh" }}
      >
        <div className="col-md-6 text-center">
          <h5 className="text-success">
            Welcome to FoodNest
          </h5>

          <h1 className="fw-bold mb-0">
            Manage Food Smarter,
          </h1>

          <h1 className="text-success fw-bold">
            Live Healthier
          </h1>

          <p className="text-muted">
            Track your food items, monitor expiry dates,
            and reduce food waste with ease.
          </p>
<Link to="/courses" className="btn btn-success px-4">
    Food Dashboard
</Link>
        </div>

        <div className="col-md-6 text-center">
          <img
            className="img-fluid"
            style={{
              maxHeight: "45vh",
              objectFit: "contain",
            }}
           src={homebg}
            alt="FoodNest"
          />
        </div>
      </div>

      <div className="container">
        <div className="row g-3">
          <div className="col-md-3">
            <div
              className="card border-0 shadow-sm h-100 rounded-4"
              style={{ background: "#d9e4ef" }}
            >
              <div className="card-body text-center">
                <h6>Total Food Items</h6>
                <h3 className="text-primary fw-bold">
                  {totalFoods}
                </h3>
                <p className="text-muted small mb-0">
                  All items in your inventory
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div
              className="card border-0 shadow-sm h-100 rounded-4"
              style={{ background: "#c3e3cd" }}
            >
              <div className="card-body text-center">
                <h6>Fresh Items</h6>
                <h3 className="text-success fw-bold">
                  {freshItems}
                </h3>
                <p className="text-muted small mb-0">
                  Items are fresh and safe
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div
              className="card border-0 shadow-sm h-100 rounded-4"
              style={{ background: "#f3e8bd" }}
            >
              <div className="card-body text-center">
                <h6>Expiring Soon</h6>
                <h3 className="text-warning fw-bold">
                  {expiringSoon}
                </h3>
                <p className="text-muted small mb-0">
                  Items expiring in next 7 days
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div
              className="card border-0 shadow-sm h-100 rounded-4"
              style={{ background: "#e9bebe" }}
            >
              <div className="card-body text-center">
                <h6>Expired Items</h6>
                <h3 className="text-danger fw-bold">
                  {expiredItems}
                </h3>
                <p className="text-muted small mb-0">
                  Items already expired
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
