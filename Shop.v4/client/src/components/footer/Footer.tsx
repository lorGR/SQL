import { Link } from "react-router-dom";

import mailIcon from "../../assets/svg/footer/mailIcon.svg";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__right">
        <div className="footer__right__col">
          <p className="footer__title">חנות מוצרי Apple</p>
          <Link to="/store/mac">Mac</Link>
          <Link to="/store/iphone">iPhone</Link>
          <Link to="/store/ipad">iPad</Link>
          <Link to="/store/apple_watch">Apple Watch</Link>
          <Link to="/store/air_pods">Air Pods</Link>
          <Link to="/store/apple_tv">Apple TV</Link>
        </div>
        <div className="footer__right__col">
          <p className="footer__title">שירותי iDigital</p>
          <p className="footer__p">סטטוס קריאת שינה</p>
          <p className="footer__p">מדיניות החזרת מוצרים</p>
          <p className="footer__p">שירות ותמיכה</p>
          <p className="footer__p">הרחבת אחריות iDigital Care</p>
          <p className="footer__p">חנות אונליין</p>
          <p className="footer__p">חנות טלפונית iDigital</p>
          <p className="footer__p">iDigital Outlet</p>
          <p className="footer__p">חנות iDigital Goodiz</p>
        </div>
        <div className="footer__right__col">
          <p className="footer__title">אודות iDigital</p>
          <p className="footer__p">סניפים</p>
          <p className="footer__p">דרושים</p>
          <p className="footer__p">כתבות</p>
          <p className="footer__p">תקנון החנות</p>
          <p className="footer__p">נגישות</p>
          <p className="footer__p">צור קשר</p>
          <p className="footer__p">מפת אתר</p>
        </div>
      </div>
      <div className="footer__left">
        <div className="footer__left__subscription">
          <p className="footer__left__subscription__title">הרשם לקבלת מבצעים עדכונים ועוד</p>
          <form className="footer__left__subscription__form">
            <div className="footer__left__subscription__form__box">
              <input className="footer__left__subscription__form__box__input" type="email" name="email" id="email" placeholder="מייל" />
              <button className="footer__left__subscription__form__box__button">
                <img src={mailIcon} alt="mailIcon" />
              </button>
            </div>
            <input className="footer__left__subscription__form__checkbox" type="checkbox" name="checkbox" id="checkbox" />
            <label className="footer__left__subscription__form__checkbox-label" htmlFor="checkbox">אני מאשר קבלת דיוור מחברת iDigital</label>
          </form>
        </div>
        <div className="footer__left__info">
          <div className="footer__left__info__support">
            <p className="footer__left__title">שירות לקחות</p>
            <p className="footer__left__tel">03-9005355</p>
            <p className="footer__left__days">א׳ -ה׳ 09:00-17:00</p>
          </div>
          <div className="footer__left__info__sellers">
            <p className="footer__left__title">ייעוץ מכירות</p>
            <p className="footer__left__tel">*8336</p>
            <p className="footer__left__days">א׳-ה׳ 09:00-17:00</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer;