import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Storenav from "../../components/storenav/Storenav";
import { getUserByCookie } from "../../features/user/userAPI";
import { selectUser } from "../../features/user/userSlice";

const Main = () => {

    // const dispatch = useAppDispatch();

    // useEffect(() => {
    //     dispatch(getUserByCookie());
    // },[]);

    return (
        <div className="main">
            <Navbar />
            <Storenav />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Main;