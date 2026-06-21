import { useEffect, useState } from "react";
import axios from "axios";

function Courses() {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [sortField, setSortField] = useState("");
const [sortOrder, setSortOrder] = useState("asc");
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    expiryDate: "",
  });

  const API_URL = `${import.meta.env.VITE_API_URL}/api/items`;

const fetchFoods = async () => {
  try {
    const res = await axios.get(API_URL);

    console.log("API Response:", res.data);

    if (Array.isArray(res.data)) {
      setFoods(res.data);
    } else if (Array.isArray(res.data.foods)) {
      setFoods(res.data.foods);
    } else if (Array.isArray(res.data.data)) {
      setFoods(res.data.data);
    } else {
      setFoods([]);
    }
  } catch (error) {
    console.log(error);
    setFoods([]);
  }
};

  useEffect(() => {
    fetchFoods();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addFood = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(
          `${API_URL}/${editingId}`,
          formData
        );

        setEditingId(null);
      } else {
        await axios.post(API_URL, formData);
      }

      setFormData({
        name: "",
        category: "",
        quantity: "",
        expiryDate: "",
      });

      fetchFoods();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFood = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchFoods();
    } catch (error) {
      console.log(error);
    }
  };

  const editFood = (food) => {
    setEditingId(food._id);

    setFormData({
      name: food.name,
      category: food.category,
      quantity: food.quantity,
      expiryDate: food.expiryDate.split("T")[0],
    });
  };

  const getStatus = (qty) => {
    if (qty === 0) return "Out of Stock";
    if (qty <= 10) return "Low Stock";
    return "In Stock";
  };

const foodList = Array.isArray(foods) ? foods : [];

const totalFoods = foodList.length;

const inStock = foodList.filter(
  (food) => food.quantity > 10
).length;

const lowStock = foodList.filter(
  (food) =>
    food.quantity > 0 &&
    food.quantity <= 10
).length;

const outOfStock = foodList.filter(
  (food) => food.quantity === 0
).length;

  
  const getExpiryStatus = (expiryDate) => {
  const today = new Date();
  const expiry = new Date(expiryDate);

  today.setHours(0, 0, 0, 0);
  expiry.setHours(0, 0, 0, 0);

  const diffDays = Math.floor(
    (expiry - today) / (1000 * 60 * 60 * 24)
  );

  if (diffDays < 0) return "Expired";
  if (diffDays <= 7) return "Expiring Soon";
  return "Fresh";
};
const filteredFoods = foodList
  .filter(
    (food) =>
      food.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      food.category
        .toLowerCase()
        .includes(search.toLowerCase())
  )
  .sort((a, b) => {
    if (sortField === "name") {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }

    if (sortField === "status") {
      const order = {
        Expired: 1,
        "Expiring Soon": 2,
        Fresh: 3,
      };

      return sortOrder === "asc"
        ? order[getExpiryStatus(a.expiryDate)] -
            order[getExpiryStatus(b.expiryDate)]
        : order[getExpiryStatus(b.expiryDate)] -
            order[getExpiryStatus(a.expiryDate)];
    }

    return 0;
  });
const getExpiryBadge = (expiryDate) => {
  const status = getExpiryStatus(expiryDate);

  switch (status) {
    case "Expired":
      return (
        <span className="badge bg-danger ms-2">
          Expired
        </span>
      );

    case "Expiring Soon":
      return (
        <span className="badge bg-warning text-dark ms-2">
          Expiring Soon
        </span>
      );

    default:
      return (
        <span className="badge bg-success ms-2">
          Fresh
        </span>
      );
  }
};
const handleSort = (field) => {
  if (sortField === field) {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  } else {
    setSortField(field);
    setSortOrder("asc");
  }
};


  
  return (
  <div className="container-fluid p-2 p-md-4">
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h3 className="fw-bold text-primary mb-0">
        Food Inventory
      </h3>
    </div>


    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body">
        <h5 className="mb-3">
          {editingId ? "Update Food Item" : "Add Food Item"}
        </h5>

        <form onSubmit={addFood}>
          <div className="row g-3">
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Food Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                name="quantity"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-2">
              <input
                type="date"
                className="form-control"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-2 d-grid">
              <button
                type="submit" style={{width:"100px"}}
                className={`btn ${
                  editingId ? "btn-warning" : "btn-success"
                }`}
              >
                {editingId ? "Update" : "Add Food"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <div className="row mb-3">
     <div className="col-12 col-md-4 ms-md-auto">
        <input
          type="text"
          className="form-control"
          placeholder="🥕🔍Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>

    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-hover align-middle" style={{backgroundColor:"rgb(92, 150, 249)"}}>
            <thead className="table-light" style={{backgroundColor:"rgb(92, 150, 249)"}}>
              <tr>
  <th
  style={{ cursor: "pointer" }}
  onClick={() => handleSort("name")}
>
  Food Name{" "}
  {sortField === "name"
    ? sortOrder === "asc"
      ? "▲"
      : "▼"
    : "↕"}
</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Expiry Date</th>
              <th
  style={{ cursor: "pointer" }}
  onClick={() => handleSort("status")}
>
  Status{" "}
  {sortField === "status"
    ? sortOrder === "asc"
      ? "▲"
      : "▼"
    : "↕"}
</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredFoods.map((food) => (
                <tr key={food._id}>
                  <td>{food.name}</td>
                  <td>{food.category}</td>
                  <td>{food.quantity}</td>
                  <td>
                    {new Date(food.expiryDate).toLocaleDateString()}
                  </td>

                 <td>
  {food.quantity === 0 ? (
    <span className="badge bg-danger">
      Out of Stock
    </span>
  ) : food.quantity <= 10 ? (
    <span className="badge bg-warning text-dark">
      Low Stock
    </span>
  ) : (
    <span className="badge bg-success">
      In Stock
    </span>
  )}

  {getExpiryBadge(food.expiryDate)}
</td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-primary me-2"
                      style={{width:"70px"}}
                      onClick={() => editFood(food)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-sm btn-danger" style={{width:"70px"}}
                      onClick={() => deleteFood(food._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {filteredFoods.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center text-muted py-4"
                  >
                    No food items found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);
}
export default Courses;
