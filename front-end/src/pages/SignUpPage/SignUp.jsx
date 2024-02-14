import { useState } from "react";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Signup = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="h-screen  flex justify-center items-center ">
      <div className="p-6 md:p-3 max-h-screen mt-5   rounded-md shadow-2xl w-96">
        <h1 className="text-2xl md:text-xl font-semibold  text-center ">
          Sign Up
        </h1>
        <form encType="multipart/form-data" className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block ">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              className="w-full  border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block ">
              Email
            </label>
            <input
              type="text"
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
              type="file"
              name="profilePhoto"
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
            <span className="text-black hover:underline">Log in</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
