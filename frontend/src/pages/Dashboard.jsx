import { Outlet } from "react-router-dom";
import SideNav from "../components/SideNav";

function Dashboard() {
  return (
    <div className="container-fluid p-0">
      <div className="row g-0 align-items-stretch">

        <div className="col-12 col-md-3 col-lg-2">
          <SideNav />
        </div>

        <div className="col-12 col-md-9 col-lg-10 p-3">
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default Dashboard;