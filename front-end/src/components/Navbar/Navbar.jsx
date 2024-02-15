import LogoImage from "../../assets/favicon.png";
import { NavLink ,Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="w-screen px-5 bg-[#1f5376] py-3 h-fit flex items-center justify-between">
      <Link to="/">
        <div className="flex gap-3 items-center">
          <img srcSet={LogoImage} alt="" width={30} />
          <span>Trade-Hub</span>
        </div>
      </Link>

      <ul className="list-none flex items-center justify-evenly gap-5 px-5">
        <NavLink to="/">
          <li>Home</li>
        </NavLink>
        <NavLink to="/profile/2">
          <li>Profile</li>
        </NavLink>
        <NavLink to="/contact-us">
          <li>Contact Us</li>
        </NavLink>
        <NavLink to="/chat/2">
          <li>Chat</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Navbar;
