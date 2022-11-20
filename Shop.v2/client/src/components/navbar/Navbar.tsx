import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
        <div className="navbar__menu">
            <Link to="">חיפוש</Link>
            <Link to="/my-account">החשבון שלי</Link>
            <Link to="">הסל שלי</Link>
        </div>
        <div className="navbar__description">
            <Link to="/">LOGO</Link>
        </div>
    </nav>
  )
}

export default Navbar;