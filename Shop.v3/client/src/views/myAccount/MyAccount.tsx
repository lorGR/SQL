import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { getUserByCookie } from "../../features/user/userAPI";



const MyAccount = () => {

    const dispatch = useAppDispatch();
    useEffect(() => {
        const allCookies = document.cookie;
        if(allCookies.length > 0) {
            console.log("Cookies not empty");
            dispatch(getUserByCookie());
        }
    }, [])

    const handleLogin = async (event: React.FormEvent<HTMLFormElement> | any) => {
        try {
            event.preventDefault();
            const [email, password] = [event.target.elements.email.value, event.target.password.value];
            const { data } = await axios.post("/users/login-user", { email, password });
            if (!data) throw new Error("Couldn't receive data from axios POST '/login-user'");
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="my-account">
            <h1>אזור אישי</h1>
            <div className="my-account__container">
                <div className="my-account__new-user">
                    <h2>לקוח חדש</h2>
                    <p>על ידי יצירת חשבון לקוח באתר שלנו באפשרותך לעבור תהליך רכישה מהיר</p>
                    <p>שירות לקוחות ותמיכה טכנית</p>
                    <p>03-9005355</p>
                    <Link to="/my-account/registration">צור חשבון</Link>
                </div>
                <div className="my-account__login-user">
                    <h2>לקוח חוזר</h2>
                    <p>אם כבר יש לך חשבון לקוח בחנות שלנו הנך מוזמן להתחבר</p>
                    {/* create component of login */}
                    <form onSubmit={handleLogin}>
                        <input type="email" name="email" id="email" placeholder="דוא״ל" />
                        <input type="password" name="password" id="password" placeholder="סיסמה" autoComplete="false" />
                        <button>התחבר</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default MyAccount;