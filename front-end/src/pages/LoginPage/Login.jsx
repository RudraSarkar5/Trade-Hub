import { useState } from "react";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Login = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="h-screen flex justify-center items-center ">
      <div className="p-6  rounded-md shadow-2xl w-96">
        <h1 className="text-2xl font-semibold mb-2 text-center ">Login</h1>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block ">
              User Id
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className="w-full px-2 py-1  border rounded-md focus:outline-none focus:border-blue-500"
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
                id="password"
                className="w-full px-2 py-1  border rounded-md focus:outline-none focus:border-blue-500"
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

          <div className="text-center">
            <button
              type="submit"
              className=" px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-2 text-center">
          <p>
            If have not a Account?{" "}
            <span className="text-black hover:underline">Sign Up</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
