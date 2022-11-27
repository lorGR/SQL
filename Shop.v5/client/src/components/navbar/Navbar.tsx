import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getUserByCookie } from "../../features/user/userAPI";
import { User } from "../../features/user/userModel";
import { selectUser, UserState } from "../../features/user/userSlice";

import cartIcon from "../../assets/svg/navbar/cartIcon.svg";
import myAccountIcon from "../../assets/svg/navbar/myAccountIcon.svg";

const Navbar = () => {

  const dispatch = useAppDispatch();
  const user: User = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(getUserByCookie());
  }, []);

  return (
    <nav className="navbar">

      <div className="navbar__store-presentation">
        <Link to="/">
          <div className="navbar__store-presentation__images">
            <img src="https://www.idigital.co.il/SVTemplate/img/general_new/premium_new.png" alt="apple premium reseller" />
            <img src="https://www.idigital.co.il/SVTemplate/img/general/iDigital.png" alt="store logo idigital" />
          </div>
        </Link>
      </div>
      <div className="navbar__greet-user">
        {!user &&
          <div className="navbar__greet-user__container">
            <p>שלום אורח</p>
          </div>
        }
        {user &&
          <div className="navbar__greet-user__container">
            <p>שלום</p>
            <p>{user.first_name} {user.last_name}</p>
          </div>
        }
      </div>
      <div className="navbar__menu">
        {/* <Link to="">חיפוש</Link> */}
        <Link className="navbar__menu__item" to="/my-account">
          <div className="navbar__menu__item__container">
            <img src={myAccountIcon} alt="my account icon" />
            <p>החשבון שלי</p>
          </div>
        </Link>
        {/* TODO: */}
        {/* Add number of cart items */}
        <Link className="navbar__menu__item" to="/cart">
          <div className="navbar__menu__item__container">
            <img src={cartIcon} alt="cart icon" />
            <p>הסל שלי</p>
          </div>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar;