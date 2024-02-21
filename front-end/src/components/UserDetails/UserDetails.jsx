import { Link, NavLink } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
const UserDetails = ({ user, deleteProfile, logOutProfile }) => {
  
  return (
    <div className="p-4 rounded-md shadow-lg bg-blue-200">
      <img
        className="w-32 h-32 rounded-full mx-auto"
        src={user?.avatar?.secure_url}
        alt="Profile"
      />
      <div className="  flex justify-center items-center relative left-4 gap-2">
        <h2
          className="text-2xl font-semibold text-center 
           text-blue-800"
        >
          {user.name}
        </h2>
        <NavLink to="/profile-update" state={user}>
          <FaEdit className=" text-black" />
        </NavLink>
      </div>

      <div className="text-center mt-2">
        <p className="text-gray-600">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="text-gray-600">
          <strong>Location:</strong> {user.location}
        </p>
        <p className="text-gray-600">
        </p>
        <div className="flex justify-center items-center gap-5">
          <button
            onClick={deleteProfile}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-900 transition"
          >
            Delete
          </button>
          <button
            onClick={logOutProfile}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
