import { Outlet } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Sidenav from "../../components/sidenav/Sidenav";

const Main = () => {
  return (
    <div>
        <Navbar />
        <Sidenav />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Main;