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
        if (allCookies.length > 0) {
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
        <div className="registration page-container" dir="rtl">
            <h1 className="registration__title">יצירת חשבון</h1>
            <form onSubmit={handleRegistration}>
                <div className="registration__personal-details">
                    <h3>פרטיים אישיים</h3>
                    <div className="label">
                        <label htmlFor="firstName">שם פרטי
                        
                        <sup>*</sup>
                        </label>
                        <div className="label__input"><input type="text" name="firstName" id="firstName" /></div>
                    </div>

                    <div className="label">
                        <label htmlFor="lastName">שם משפחה
                        
                        <sup>*</sup>
                        </label>
                        <div className="label__input"><input type="text" name="lastName" id="lastName" /></div>
                    </div>

                    <div className="label">
                        <label htmlFor="identifierNumber">ת.ז
                        <sup>*</sup>
                        </label>
                        <div className="label__input"><input type="number" name="identifierNumber" id="identifierNumber" /></div>
                    </div>

                    <div className="label">
                        <label htmlFor="phoneNumber">טלפון נייד של המזמין
                        <sup>*</sup>
                        
                        </label>
                        <div className="label__input"><input type="number" name="phoneNumber" id="phoneNumber" /></div>
                    </div>

                    <div className="label">
                        <label htmlFor="email">דוא״ל
                        
                        <sup>*</sup>
                        </label>
                        <div className="label__input"><input type="email" name="email" id="email" /></div>
                    </div>

                </div>
                <div className="registration__personal-address">
                    <h3>כתובת למשלוח</h3>
                    <div className="label">
                        <label htmlFor="city">עיר
                        
                        <sup>*</sup>
                        </label>
                        <div className="label__input"><input type="text" name="city" id="city" /></div>
                    </div>

                    <div className="label">
                        <label htmlFor="streetAddress">רחוב
                        
                        <sup>*</sup>
                        </label>
                        <div className="label__input"><input type="text" name="streetAddress" id="streetAddress" /></div>
                    </div>

                    <div className="label">
                        <label htmlFor="houseNumber">מספר בית
                        
                        <sup>*</sup>
                        </label>
                        <div className="label__input"><input type="text" name="houseNumber" id="houseNumber" /></div>
                    </div>

                    <div className="label">
                        <label htmlFor="postalCode">מיקוד
                        
                        <sup>*</sup>
                        </label>
                        <div className="label__input"><input type="text" name="postalCode" id="postalCode" /></div>
                    </div>
                </div>
                <div className="registration__login-details">
                    <h3>פרטי התחברות</h3>
                    <div className="label">
                        <label htmlFor="confirmEmail">דוא״ל
                        
                        <sup>*</sup>
                        </label>
                        <div className="label__input"><input type="email" name="confirmEmail" id="confirmEmail" /></div>
                    </div>

                    <div className="label">
                        <label htmlFor="password">סיסמה
                        
                        <sup>*</sup>
                        </label>
                        <div className="label__input"><input type="password" name="password" id="password" autoComplete="true" /></div>
                    </div>

                    <div className="label">
                        <label htmlFor="confirmPassword">אשר סיסמה
                        
                        <sup>*</sup>
                        </label>
                        <div className="label__input"><input type="password" name="confirmPassword" id="confirmPassword" autoComplete="true" /></div>
                    </div>
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