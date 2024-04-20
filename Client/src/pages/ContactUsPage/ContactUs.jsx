import { useState } from "react";
import Layout from "../../Layout/Layout";
import mailingPhoto from "./asset/mailing.png";
import { FaFacebookSquare, FaInstagram, FaTelegram } from "react-icons/fa";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { sendFeedback } from "../../redux/userSlice";

const ContactUs = () => {

  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state)=>state.user);

  const [ contact , setContact ] = useState({});
  const [ showMessage, setShowMessage] = useState(false);

  const handleChange = (e)=>{
    const { name ,value } = e.target;
    setContact(
      {
          ...contact,
        [name] : value,
      }
    )
  }

  const handleSubmit = async (e)=>{

    e.preventDefault();

    if ( !isLoggedIn ){
      toast.error("please log in first!");
      return;
    }

    const { name , message } = contact;

    if(!name || !message ){
      toast.error("please all the field!");
      return;
    }

    const action = await dispatch(sendFeedback(contact));

    if (action.payload.success){
      setShowMessage(true);
    }

  }



  return (
    <Layout>
      <div className=" h-[80vh]   w-screen flex  flex-col md:flex-row md:justify-center md:items-center  item-center justify-around   px-4   text-white">
        <div className=" md:w-[70vw]  md:flex gap-5 md:justify-center md:flex-row">
          <div className=" flex gap-1 flex-col  md:justify-center">
            <div className=" md:self-center flex flex-col gap-2">
              <h1 className="text-4xl text-center font-serif  font-extrabold">
                Let's Talk
              </h1>
              <h1 className=" text-center  text-xl font-serif  leading-tight">
                We Love Your Feedback. Review on How to Serve You. We Always
                Listen
              </h1>
            </div>

            <div className=" md:self-center flex justify-center items-center">
              <img src={mailingPhoto} alt="mailing image" width={250} />
            </div>
          </div>

          <div className="flex gap-2 md:gap-5 flex-col   md:items-center md:justify-center w-full ">
            <div className=" md:flex md:justify-center md:items-center">
              <form
                onSubmit={handleSubmit}
                className="flex  flex-col  font-mono gap-1 md:gap-3"
              >
                <label className="font-serif" htmlFor="name">
                  What is your Name?
                </label>
                <input
                  className=" px-3  rounded-lg  bg-[#383636ca]    text-white"
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleChange}
                />
                <label className="font-serif" htmlFor="message">
                  How can we help you?
                </label>
                <textarea
                  className="px-3  rounded-lg bg-[#383636ca]    text-white"
                  type="text-area"
                  rows={5} 
                  cols={30}
                  name="message"
                  id="message"
                  onChange={handleChange}
                />
                {showMessage && (
                  <span className=" text-green-400 hover:underline">
                    Successfully send you Feedback.
                  </span>
                )}
                <button
                  type="submit"
                  className="w-full font-serif  bg-blue-700 rounded-lg py-1"
                >
                  Submit
                </button>
              </form>
            </div>

            <div className=" flex justify-center items-center flex-col">
              <div className="font-serif">Got connected with</div>
              <div className="flex gap-2 md:gap-5">
                <FaFacebookSquare />
                <FaInstagram />
                <FaTelegram />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;
