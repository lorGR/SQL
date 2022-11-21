import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { getUserByCookie } from "../../features/user/userAPI";


const Registration = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const allCookies = document.cookie;
        if(allCookies.length > 0) {
            dispatch(getUserByCookie());
        }
    }, [])

    const handleRegistration = async (event: React.FormEvent<HTMLFormElement> | any) => {
        try {
            event.preventDefault();
            let { firstName, lastName, identifierNumber,
                phoneNumber, email, confirmEmail, city,
                streetAddress, houseNumber, postalCode,
                password, confirmPassword } = event.target.elements;
            [firstName, lastName, identifierNumber, phoneNumber, email, confirmEmail, city, streetAddress, houseNumber, postalCode, password, confirmPassword] =
                [firstName.value, lastName.value, identifierNumber.value, phoneNumber.value, email.value, confirmEmail.value, city.value, streetAddress.value, houseNumber.value, postalCode.value, password.value, confirmPassword.value];

            const { data } = await axios.post('/users/register-user', {
                firstName, lastName, identifierNumber,
                phoneNumber, email, confirmEmail, city,
                streetAddress, houseNumber, postalCode,
                password, confirmPassword
            });
            if (!data) throw new Error("Couldn't receive data from axios POST '/register-user'");
            if (data.registered === true) {
                navigate("/");
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="registration" dir="rtl">
            <h1>יצירת חשבון</h1>
            <form onSubmit={handleRegistration}>
                <div className="registration__personal-details">
                    <h3>פרטיים אישיים</h3>
                    <sup>*</sup>
                    <label htmlFor="firstName">שם פרטי</label>
                    <input type="text" name="firstName" id="firstName" />

                    <sup>*</sup>
                    <label htmlFor="lastName">שם משפחה</label>
                    <input type="text" name="lastName" id="lastName" />

                    <sup>*</sup>
                    <label htmlFor="identifierNumber">ת.ז</label>
                    <input type="number" name="identifierNumber" id="identifierNumber" />

                    <sup>*</sup>
                    <label htmlFor="phoneNumber">טלפון נייד של המזמין</label>
                    <input type="number" name="phoneNumber" id="phoneNumber" />

                    <sup>*</sup>
                    <label htmlFor="email">דוא״ל</label>
                    <input type="email" name="email" id="email" />
                </div>
                <div className="registration__personal-address">
                    <h3>כתובת למשלוח</h3>
                    <sup>*</sup>
                    <label htmlFor="city">עיר</label>
                    <input type="text" name="city" id="city" />

                    <sup>*</sup>
                    <label htmlFor="streetAddress">רחוב</label>
                    <input type="text" name="streetAddress" id="streetAddress" />

                    <sup>*</sup>
                    <label htmlFor="houseNumber">מספר בית</label>
                    <input type="text" name="houseNumber" id="houseNumber" />

                    <sup>*</sup>
                    <label htmlFor="postalCode">מיקוד</label>
                    <input type="text" name="postalCode" id="postalCode" />
                </div>
                <div className="registration__login-details">
                    <h3>פרטי התחברות</h3>
                    <sup>*</sup>
                    <label htmlFor="confirmEmail">דוא״ל</label>
                    <input type="email" name="confirmEmail" id="confirmEmail" />

                    <sup>*</sup>
                    <label htmlFor="password">סיסמה</label>
                    <input type="password" name="password" id="password" autoComplete="true" />

                    <sup>*</sup>
                    <label htmlFor="confirmPassword">אשר סיסמה</label>
                    <input type="password" name="confirmPassword" id="confirmPassword" autoComplete="true" />
                </div>
                <div className="registration__sumbition">
                    <input type="reset" value="נקה" />
                    <button>שמור</button>
                </div>
            </form>
        </div>
    );
}

export default Registration;