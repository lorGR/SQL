import { Link, useNavigate } from "react-router-dom";

import searchIcon from "../../assets/svg/storenav/searchIcon.svg";

const Storenav = () => {

  const navigate = useNavigate();

  const handleSearchItems = (event: React.FormEvent<HTMLFormElement> | any) => {
    try {
      event.preventDefault();
      if(event.target[0].value.length > 0) {
        navigate(`/store/${event.target[0].value}`);
        event.target[0].value = "";
      }
    } catch (error) {
      console.error(error);
    }
  }

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

      <form onSubmit={handleSearchItems}>
        <input type="text" name="" id="" placeholder="חיפוש" />
        <button>
          <img src={searchIcon} alt="searchIcon" />
        </button>
      </form>

    </div>
  )
}

export default Storenav;