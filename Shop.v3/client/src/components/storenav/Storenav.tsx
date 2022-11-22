import { Link } from "react-router-dom";

const Storenav = () => {
  return (
    <div className="storenav">
        <Link to="/store/mac">Mac</Link>
        <Link to="/store/iphone">iPhone</Link>
        <Link to="/store/ipad">iPad</Link>
        <Link to="/store/apple_watch">Apple Watch</Link>
        <Link to="/store/air_pods">AirPods</Link>
        <Link to="/store/apple_tv">Apple TV</Link>
        {/* <Link to="/store/air_tag">AirTag</Link> */}
    </div>
  )
}

export default Storenav;