import LogoImage from "../../assets/favicon.png";
import { NavLink ,Link } from "react-router-dom";
import {useDispatch,useSelector} from "react-redux"
import { useContext, useEffect } from "react";


import { chatContext } from "../../contexApi/chatContext";

const Navbar = () => {
  const { socket, notification } = useContext(chatContext);
  

  const isLoggedIn = useSelector((state)=>state.user.isLoggedIn);

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const myId = userDetails?userDetails._id:null;
 
  
  


  
  return (
    <div className="w-screen fixed top-0 z-10  px-1 bg-[#1f5376] py-2 h-fit flex items-center justify-between">
      <Link to="/">
        <div className="flex gap-1.5 items-center">
          <img srcSet={LogoImage} alt="" width={20} />
          <span>Trade-Hub</span>
        </div>
      </Link>

      <ul className="list-none flex items-center justify-evenly md:gap-8 gap-2 px-3 md:px-8 text-sm">
        <NavLink to="/">
          <li>Home</li>
        </NavLink>
        {isLoggedIn ? (
          <NavLink to="/profile">
            <li>Profile</li>
          </NavLink>
        ) : (
          <NavLink to="/signup">
            <li>Sign-up</li>
          </NavLink>
        )}
        <NavLink to="/contact-us">
          <li>Contact Us</li>
        </NavLink>
        {isLoggedIn && (
          <NavLink to="/chat">
            <li className="flex gap-1">chat {notification?(<h1>({notification})</h1>):null} </li>
          </NavLink>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
