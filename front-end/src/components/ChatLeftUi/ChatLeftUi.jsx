import { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { socket } from "../../helper/socket";
import axios from "../../helper/axiosInstance";
import { Link, NavLink, useNavigate } from "react-router-dom";

const ChatLeftUi = ({ chatShow, show }) => {
  // const clsName = smallScreen
  //   ? "w-screen h-[90vh] md:hidden  md:w-1/3 bg-red-500"
  //   : "w-screen h-[90vh] hidden md:block  md:w-1/3 bg-red-500";

  const [friendList, setFriendList] = useState([]);
  const navigate = useNavigate();
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  const handleClickOnFriend = (friend) => {
    navigate("/chat", { state: { friendDetails: friend } });
    chatShow();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/chat/get-friends");
        if (response.data.success) {
          setFriendList(response.data.friends);
        } else {
          navigate("/signup");
        }
      } catch (error) {}
    };

    fetchData();
  }, []);

  const leftBarClassName = show
    ? "h-[100%]   md:flex flex-col bg-gray-700  hidden md:w-1/3"
    : "h-[100%]   flex flex-col bg-gray-700 w-full md:w-1/3";

  return (
    <div className={leftBarClassName}>
      <div className="w-full h-fit bg-gray-900 p-2 items-center flex gap-2 ">
        <Link to="/">
          <IoMdArrowBack />
        </Link>
        <img
          src={
            userDetails.avatar.public_id.length === 0
              ? "./src/assets/avatar.png"
              : userDetails.avatar.secure_url
          }
          alt="profile Photo"
          width={25}
          className="rounded-lg"
        />
        <h1>{userDetails && userDetails.name}</h1>
      </div>

      <div className="w-full overflow-y-scroll  h-full space-y-2">
        {friendList.length > 0 &&
          friendList.map((friend, idx) => (
            <div
              key={friend._id}
              onClick={() => handleClickOnFriend(friend)}
              className=" w-full h-fit  p-4 items-center flex gap-2 bg-gray-500 rounded-lg "
            >
              <img
                src={
                  friend.avatar.public_id.length === 0
                    ? "./src/assets/avatar.png"
                    : friend.avatar.secure_url
                }
                alt="friendPhoto"
                width={25}
                className="rounded-lg"
              />

              <h1 className=" text-md text-black">{friend.name}</h1>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ChatLeftUi;
