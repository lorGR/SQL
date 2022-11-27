import { Link } from "react-router-dom";

import searchIcon from "../../assets/svg/storenav/searchIcon.svg";

const Storenav = () => {
  return (
    <div className="storenav">
      <Link to="/store/mac">Mac</Link>
      <Link to="/store/iphone">iPhone</Link>
      <Link to="/store/ipad">iPad</Link>
      <Link to="/store/apple_watch">Apple Watch</Link>
      <Link to="/store/air_pods">AirPods</Link>
      <Link to="/store/apple_tv">Apple TV</Link>
      
      {/* TODO: */}
      {/* Manage the search bar */}
      
      <form action="">
        <input type="text" name="" id="" placeholder="חיפוש" />
        <button>
          <img src={searchIcon} alt="searchIcon" />
        </button>
      </form>

    </div>
  )
}

export default Storenav;