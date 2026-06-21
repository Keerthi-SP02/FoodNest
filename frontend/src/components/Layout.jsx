import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SideNav from "./SideNav";

function Layout() {
  return (
    <>
      <Header />

     <div style={{ display: "flex"}}>
                    <SideNav />
                    <main style={{ padding: "20px", flex: 1}}>
                        <Outlet />
                    </main>
                </div>

      <Footer />
    </>
  );
}

export default Layout;