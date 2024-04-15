import { useEffect, useRef, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import axios from "../../helper/axiosInstance";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { useContext } from "react";
import { chatContext } from "../../contexApi/ContextProvider";
import { useDispatch, useSelector } from "react-redux";
import { getChatList } from "../../redux/chatSlice";

const ChatLeftUi = ({ chatShow, show }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { friends, setSelectedFriend } = useContext(chatContext);

  // this will track chat state

  // this state will contain all friends
  const [friendList, setFriendList] = useState([]);

  // this state will keep track the active friend chat
  const [friendActiveId, setFriendActiveId] = useState(null);

  // this will fetch userDetails from localStorage
  // const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  // const handleClickOnFriend = (friend) => {
  //   navigate("/chat");

  //   setSelectedFriend(friend);
  //   if (friendActiveId == friend._id) {
  //     chatShow();
  //   } else {
  //     chatShow(true);
  //   }
  //   setFriendActiveId(friend._id);
  // };

  // useEffect(() => {
  //   setFriendList(friends);
  // }, [friends]);

  const { chatUpToDate, chatList } = useSelector((state)=>state.chat);
  const { userData } = useSelector((state) => state.user);

  

  useEffect(() => {
    if(!chatUpToDate){
       dispatch(getChatList());
    }
  }, [chatUpToDate]);

  const leftBarClassName = show
    ? "h-[100%]   md:flex flex-col bg-gray-700  hidden md:w-1/3"
    : "h-[100%]   flex flex-col bg-gray-700  w-full md:w-1/3";

  return (
    <div className={leftBarClassName}>
      <div className="w-full h-fit bg-gray-900 p-2 items-center flex gap-2 ">
        <Link to="/">
          <IoMdArrowBack />
        </Link>
        <img
          src={
            userData?.avatar?.userUploaded
              ? userData?.avatar?.secure_url
              : "./src/assets/avatar.png"
          }
          alt="profile Photo"
          width={25}
          className="rounded-lg"
        />
        <h1>{userData && userData.name}</h1>
      </div>

      <div className="w-full overflow-y-scroll  h-full space-y-2">
        {chatList?.length > 0 &&
          chatList.map(
            ({ user, _id, unRead, lastMessage }) =>
            (
              lastMessage && (
                <div
                  key={_id}
                  onClick={() => handleClickOnFriend(user)}
                  className={`w-full h-fit  p-4 items-center flex gap-3 bg-gray-500 ${
                    friendActiveId == user._id ? "md:bg-sky-700" : "bg-gray-500"
                  } rounded-lg`}
                >
                  <img
                    src={
                      user?.avatar.userUploaded == false
                        ? "./src/assets/avatar.png"
                        : user?.avatar.secure_url
                    }
                    alt="friendPhoto"
                    width={25}
                    className="rounded-lg"
                  />
                  <div>
                    <h1 className=" text-xl text-black">{user?.name}</h1>
                    <p
                      className={` text-xl ${
                        unRead ? "text-yellow-500 " : "text-white "
                      }`}
                    >
                      {lastMessage.content}
                    </p>
                  </div>
                </div>
              )
            )
          )}
      </div>
    </div>
  );
};

export default ChatLeftUi;
