import { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { login } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  
  const [visible, setVisible] = useState(false);
  const [loginData, setLoginData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();

    // this will check that all field should filled
    if (!loginData.email || !loginData.password) {
      toast.error("fill all the field", {
        duration: 1500,
      });
      return;
    }

    // this will check if the input filled with atleast minimum value
    if (loginData.email.length < 5 || loginData.password.length < 5) {
      toast.error("lenth of your input should be more", {
        duration: 2500,
      });
      return;
    }
    
    


    const action = await dispatch(login(loginData));
    
    if (action?.payload?.success) {
     
      navigate("/");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center ">
      <div className="p-3 m-3 border-2 border-inherit rounded-md shadow-2xl w-96">
        <h1 className="text-2xl font-semibold mb-2 text-center ">Login</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block ">
              User Id
            </label>
            <input
              onChange={handleChange}
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
                onChange={handleChange}
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
            <Link to="/signup">
              <span className=" text-yellow-400 hover:underline">Sign Up</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
