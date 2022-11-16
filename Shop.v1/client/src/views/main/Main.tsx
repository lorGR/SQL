import { Outlet } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Storenav from "../../components/storenav/Storenav";

const Main = () => {
    return (
        <div>
            <Navbar />
            <Storenav />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Main;