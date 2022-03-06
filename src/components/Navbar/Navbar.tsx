import { Link } from "react-router-dom";
import "./style.scss";

const Navbar = () => {
  return (
    <nav className="purple darken-1">
      <div className="container nav-wrapper">
        <div className="brand-logo">myLocations</div>
        <ul id="nav-mobile" className="right nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
