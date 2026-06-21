import {Link} from "react-router-dom";
function Header(){
        const user = JSON.parse(localStorage.getItem("user"));
    return(
            <div className="row" style={{background: "linear-gradient(to right, #eaf0ea, #c3e3cd)"}}>
                <div className="col-md-6">
                    <div className="d-flex align-items-center">
                        <img src="src/assets/logo.png" alt="FoodNest Logo" className="img-fluid"
                            style={{
                                    width: "100px",
                                    height: "100px",
                                    objectFit: "contain"
                                   }}></img>
                                   <div className="ms-3">
                                    <h1 className="fw-bold mb-1">
                                        <span className="text-success">Food</span>
                                        <span className="text-warning">Nest</span>
                                    </h1>
                                    <p className="text-dark">Giving your food a home, not a mystery ending.</p>
                                   </div>
                </div>
                 
                </div>
            <div className="col-md-6 text-end my-4 p-3">
                  <h4>Welcome, {user?.fullname}</h4>
            </div>
            </div>
    );
}
export default Header;