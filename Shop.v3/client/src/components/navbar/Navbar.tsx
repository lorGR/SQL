import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getUserByCookie } from "../../features/user/userAPI";
import { User } from "../../features/user/userModel";
import { selectUser, UserState } from "../../features/user/userSlice";

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
          <div className="nav__store-presentation__images">
            <img src="https://www.idigital.co.il/SVTemplate/img/general_new/premium_new.png" alt="apple premium reseller" />
            <img src="https://www.idigital.co.il/SVTemplate/img/general/iDigital.png" alt="store logo idigital" />
          </div>
        </Link>
      </div>
      <div className="navbar__greet-user">
        {!user  && <p>שלום אורח</p>}
        {user && <p>שלום {user.last_name} {user.first_name}</p>}
      </div>
      <div className="navbar__menu">
        {/* <Link to="">חיפוש</Link> */}
        <Link to="/my-account">החשבון שלי</Link>
        <Link to="/cart">הסל שלי</Link>
      </div>
    </nav>
  )
}

export default Navbar;