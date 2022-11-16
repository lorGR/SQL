import { Link } from "react-router-dom";

const Sidenav = () => {
  return (
    <div>
        <Link to="/mac">Mac</Link>
        <Link to="">iPhone</Link>
        <Link to="">iPad</Link>
        <Link to="">Apple Watch</Link>
        <Link to="">AirPods</Link>
        <Link to="">AirTag</Link>
        <Link to="">Apple TV</Link>
    </div>
  )
}

export default Sidenav;