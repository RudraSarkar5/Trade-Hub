import { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { forgetPassword, login } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

const ForgetPasswordPage = () => {
  
  const [email, setEmail] = useState("");
  const [showMessage , setShowMessage] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // this will check that all field should filled
    if (!email.length ) {
      toast.error("fill the emit field", {
        duration: 1500,
      });
      return;
    }

    // this will check if the input filled with atleast minimum value

    const action = await dispatch(forgetPassword({email}));

    if (action?.payload?.success) {
       setShowMessage(true);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center ">
      <div className="p-3 m-3 border-2 border-inherit rounded-md shadow-2xl w-96">
        <h1 className="text-2xl font-semibold mb-5 text-center ">
          Forget Password
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block ">
              Varification Email
            </label>
            <input
              placeholder="enter your varified email"
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              name="email"
              id="email"
              className="w-full px-2 py-1  border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className=" px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
            >
              Get varification Email
            </button>
          </div>
        {showMessage &&( <span className=" text-green-400 hover:underline">varification mail seccessfully sent to you ! Please Check Email box.</span>)}
        </form>
        <div className="mt-2 text-center">
          <p>
            Already have an Account?
            <Link to="/login">
              <span className=" text-yellow-400 hover:underline">Login</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
