import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { login, resetPassword } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resetToken } = useParams();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassword({
      ...password,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // this will check that all field should filled
    if (!resetToken || !password.password) {
      toast.error("fill all the field", {
        duration: 1500,
      });
      return;
    }

    // this will check if the input filled with atleast minimum value
    if (password.password.length < 5) {
      toast.error("lenth of your input should be more", {
        duration: 2500,
      });
      return;
    }

    if (password.password != password.confirmPassword) {
      toast.error("password not matching ", {
        duration: 1500,
      });
      return;
    }

    const data = {
      resetToken: resetToken,
      password: password.password,
    };

    const action = await dispatch(resetPassword(data));

    if (action?.payload?.success) {
      navigate("/login");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center ">
      <div className="p-3 m-3 border-2 border-inherit rounded-md shadow-2xl w-96">
        <h1 className="text-2xl font-semibold mb-2 text-center ">
          Reset Password
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
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
          <div>
            <label htmlFor="confirmPassword" className="block ">
              Confirm Password
            </label>
            <div className="relative">
              <input
                onChange={handleChange}
                type={visible ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
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
              Reset Password
            </button>
          </div>
        </form>
        <div className="mt-2 text-center">
          <p>
            If You Already Have an Account?
            <Link to="/login">
              <span className=" text-yellow-400 hover:underline">login</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
