import { Link } from "react-router-dom";

const Sidenav = () => {
  return (
    <div>
        <Link to="/mac_store">Mac</Link>
        <Link to="/iphone_store">iPhone</Link>
        <Link to="/ipad_store">iPad</Link>
        <Link to="/apple_watch_store">Apple Watch</Link>
        <Link to="/air_pods_store">AirPods</Link>
        <Link to="/air_tag_store">AirTag</Link>
        <Link to="/apple_tv_store">Apple TV</Link>
    </div>
  )
}

export default Sidenav;