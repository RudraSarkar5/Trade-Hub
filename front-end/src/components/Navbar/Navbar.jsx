import LogoImage from "../../assets/favicon.png";
const Navbar = () => {
  return (
    <div className="w-screen px-5 bg-[#1f5376] py-3 h-fit flex items-center justify-between">
      <div className="flex gap-3 items-center">
        <img srcSet={LogoImage} alt="" width={30} />
        <span>Trade-Hub</span>
      </div>

      <ul className="list-none flex items-center justify-evenly gap-5 px-5">
        <li>Home</li>
        <li>Contact-Us</li>
        <li>Profile</li>
      </ul>
    </div>
  );
};

export default Navbar;
