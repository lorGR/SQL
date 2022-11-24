import axios from "axios";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { getUserByCookie } from "../../features/user/userAPI";



const MyAccount = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch(getUserByCookie());
    }, [])

    const handleLogin = async (event: React.FormEvent<HTMLFormElement> | any) => {
        try {
            event.preventDefault();
            const [email, password] = [event.target.elements.email.value, event.target.password.value];
            const { data } = await axios.post("/users/login-user", { email, password });
            if (!data) throw new Error("Couldn't receive data from axios POST '/login-user'");
            if(data.loggedIn === true) {
                navigate("/");
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="my-account page-container">
            <h1 className="my-account__title">אזור אישי</h1>
            <div className="my-account__container">
                <div className="my-account__new-user">
                    <h2 className="my-account__new-user__title">לקוח חדש</h2>
                    <p className="my-account__new-user__info">על ידי יצירת חשבון לקוח באתר שלנו באפשרותך לעבור תהליך רכישה מהיר</p>
                    <p className="my-account__new-user__support-info">שירות לקוחות ותמיכה טכנית</p>
                    <p className="my-account__new-user__support-tel">03-9005355</p>
                    <Link to="/my-account/registration">צור חשבון</Link>
                </div>
                <div className="my-account__login-user">
                    <h2 className="my-account__login-user__title">לקוח חוזר</h2>
                    <p className="my-account__login-user__info">אם כבר יש לך חשבון לקוח בחנות שלנו הנך מוזמן להתחבר</p>
                    {/* TODO: create component of login */}
                    <form className="my-account__login-user__form" onSubmit={handleLogin}>
                        <input className="my-account__login-user__form__input" type="email" name="email" id="email" placeholder="דוא״ל" />
                        <input className="my-account__login-user__form__input" type="password" name="password" id="password" placeholder="סיסמה" autoComplete="false" />
                        <button className="my-account__login-user__form__btn">התחבר</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default MyAccount;