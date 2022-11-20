import { Link } from "react-router-dom";

const MyAccount = () => {
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
                <form>
                    <input type="email" name="" id="" placeholder="דוא״ל"/>
                    <input type="text" name="" id="" placeholder="סיסמה" />
                    <button>התחבר</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default MyAccount;