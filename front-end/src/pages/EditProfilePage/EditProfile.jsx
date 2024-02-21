import { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { editProfile } from "../../redux/userSlice";
import toast from "react-hot-toast";

const EditProfile = () => {
    const { state } = useLocation();
    const {name , location} = state;
    const [editProfileData, setEditProfileData] = useState({
      name,
      location
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setEditProfileData({
        ...editProfileData,
        [name]: value,
      });
    };

    const handleImage = (e) => {
      const { name, files } = e.target;
      setEditProfileData({
        ...editProfileData,
        [name]: files[0],
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      // this will check that all field should filled
      if (
        !editProfileData.name ||
        !editProfileData.location
      ) {
        toast.error("fill all the field", {
          duration: 1500,
        });
        return;
      }

      // this will check if the input filled with atleast minimum value
      if (
        editProfileData.name.length < 5 ||
        editProfileData.location.length < 3
      ) {
        toast.error("lenth of your input should be more", {
          duration: 2500,
        });
        return;
      }

      const editProfileFormData = new FormData();
      editProfileFormData.append("name", editProfileData.name);
      editProfileFormData.append("location", editProfileData.location);

      if (editProfileData.avatar) {
        editProfileFormData.append("avatar", editProfileData.avatar);
      }
      
      // Dispatch the fetchUsers thunk action and hold the promise

      const action = await dispatch(editProfile(editProfileFormData));
      if (action?.payload?.success) {
        navigate("/profile");
      }
    };

    

  return (
    <Layout>
      <div className=" h-screen md:h-fit  py-5 mb-10 px-5 flex justify-center items-center ">
        <div className=" p-3 m-3 border-2 border-inherit rounded-md shadow-2xl w-96">
          <h1 className="text-2xl font-semibold mb-2 text-center text-blue-500">
            Update Profile
          </h1>
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="space-y-4"
          >
            <div>
              <label htmlFor="fullName" className="block ">
                Full Name
              </label>
              <input
                value={editProfileData.name}
                onChange={handleChange}
                type="text"
                name="name"
                className="w-full  border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="location" className="block ">
                Location
              </label>
              <input
                value={editProfileData.location}
                onChange={handleChange}
                type="text"
                name="location"
                className="w-full  border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="profilePhoto" className="block ">
                Profile Photo
              </label>
              <input
                onChange={handleImage}
                type="file"
                name="avatar"
                accept="image/*"
                className="w-full"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="px-4  bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
              >
                update
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditProfile;
