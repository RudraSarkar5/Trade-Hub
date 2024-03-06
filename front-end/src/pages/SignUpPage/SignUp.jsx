import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { register } from "../../redux/userSlice";
import {useNavigate,Link} from "react-router-dom";

const Signup = () => {

  const [visible, setVisible] = useState(false);
  const [signUpData, setSignUpData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({
      ...signUpData,
      [name]: value,
    });
  };

  const handleImage = (e) => {
    const { name, files } = e.target;
    setSignUpData({
      ...signUpData,
      [name]: files[0],
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // this will check that all field should filled
    if (!signUpData.name || !signUpData.email || !signUpData.password ||!signUpData.location) {
      toast.error("fill all the field", {
        duration: 1500,
      });
      return;
    }

    // this will check if the input filled with atleast minimum value
    if (
      signUpData.name.length < 5 ||
      signUpData.email.length < 5 ||
      signUpData.password.length < 6 ||
      signUpData.location.length < 3
    ) {
      toast.error("lenth of your input should be more", {
        duration: 2500,
      });
      return;
    }

    const signFormData = new FormData();
    signFormData.append("name", signUpData.name);
    signFormData.append("email", signUpData.email);
    signFormData.append("password", signUpData.password);
    signFormData.append("location", signUpData.location);
   
    if (signUpData.avatar) {
      
      signFormData.append("avatar", signUpData.avatar);
    }
    
   
      // Dispatch the fetchUsers thunk action and hold the promise
      
        const action = await dispatch(register(signFormData));
        if(action?.payload?.success){
          navigate("/");
        }

     
}
  return (
    <div className="h-screen  flex justify-center items-center ">
      <div className="p-3 m-3  max-h-screen mt-5 border-white border-2  rounded-md shadow-2xl w-96">
        <h1 className="text-2xl md:text-xl font-semibold  text-center ">
          Sign Up
        </h1>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-4 text-white"
        >
          <div>
            <label htmlFor="name" className="block ">
              Full Name
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              className="w-full  border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block ">
              Email
            </label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              className="w-full  border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block ">
              Password
            </label>
            <div className="relative">
              <input
                onChange={handleChange}
                type={visible ? "text" : "password"}
                name="password"
                className="w-full px-3 py-1 border rounded-md focus:outline-none focus:border-blue-500"
              />
              {visible ? (
                <AiFillEye
                  onClick={() => setVisible(false)}
                  className=" absolute right-2 top-2 h-5"
                />
              ) : (
                <AiFillEyeInvisible
                  onClick={() => setVisible(true)}
                  className=" absolute right-2 top-2 h-5"
                />
              )}
            </div>
          </div>
          <div>
            <label htmlFor="location" className="block ">
              Location
            </label>
            <input
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
              Register
            </button>
          </div>
        </form>
        <div className="mt-2 text-center">
          <p>
            Already have an account?{" "}
            <Link to="/login">
              <span className=" text-yellow-400 hover:underline">Log in</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
