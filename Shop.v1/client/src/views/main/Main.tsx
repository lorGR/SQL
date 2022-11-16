import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Sidenav from "../../components/sidenav/Sidenav";

const Main = () => {
  return (
    <div>
        <Navbar />
        <Sidenav />
        <Outlet />
    </div>
  )
}

export default Main;