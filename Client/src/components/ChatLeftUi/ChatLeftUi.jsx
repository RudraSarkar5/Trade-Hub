import { useEffect, useRef, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import axios from "../../helper/axiosInstance";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { chatContext } from "../../contexApi/ContextProvider";
import { useDispatch, useSelector } from "react-redux";
import { clearCurrentChat, getChatList, updateCurrentChat } from "../../redux/chatSlice.js";

const ChatLeftUi = ({ showBox }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const { chatUpToDate,
          chatList,
          showChatBox,
           currentChat } = useSelector((state) => state.chat);
  const { userData } = useSelector((state) => state.user);

  const handleClickOnFriend = ({ chatId, chatFriend, unRead, lastMessage }) => {
    
    if (currentChat?.chatId == chatId ){
      dispatch(clearCurrentChat());
      return;
    }

    let needMarkRead = false;

    if ( ( lastMessage.senderId != userData._id) && ( unRead == true ) ){
        needMarkRead = true;
    }

    const chat = {
       chatId,
       chatFriend,
       needMarkRead,
    }

    dispatch(updateCurrentChat({ chat }));

  };

  useEffect(() => {

    if(!chatUpToDate){
       dispatch(getChatList());
    }

  }, [chatUpToDate]);

  const leftBarClassName = showChatBox
    ? "h-[100%]   md:flex flex-col bg-gray-700  hidden md:w-1/3"
    : "h-[100%]   flex flex-col bg-gray-700  w-full md:w-1/3";

  return (
    <div className={leftBarClassName}>
      <div className="w-full h-fit bg-[#273752] py-3 pl-2 items-center flex gap-2 ">
        <Link to="/">
          <IoMdArrowBack onClick={() => dispatch(clearCurrentChat())} />
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
        <h1 className="text-xl">{userData && userData.name}</h1>
      </div>
      <div className="w-full overflow-y-scroll  h-full space-y-2">
        {chatList?.length > 0 &&
          chatList.map(
            ({ user, _id, unRead, lastMessage }) =>
              lastMessage && (
                <div
                  key={_id}
                  onClick={() =>
                    handleClickOnFriend({
                      chatId: _id,
                      chatFriend: user,
                      unRead,
                      lastMessage,
                    })
                  }
                  className={`w-full h-fit  p-2 items-center flex gap-3 bg[#1b263b] ${
                    currentChat?.chatFriend?._id == user._id
                      ? "md:bg-sky-700"
                      : "bg-gray-500"
                  } rounded-xl`}
                >
                  <img
                    src={
                      user?.avatar.userUploaded == false
                        ? "./src/assets/avatar.png"
                        : user?.avatar.secure_url
                    }
                    alt="friendPhoto"
                    width={35}
                    className="rounded-xl"
                  />
                  <div>
                    <h1 className=" text-lg text-black">{user?.name}</h1>
                    <p
                      className={` text-lg ${
                        lastMessage.senderId != userData._id && unRead == true
                          ? "text-black "
                          : "text-white "
                      }`}
                    >
                      {lastMessage.content.substring(0, 35)}
                      {lastMessage.content.length > 35 && "..."}
                    </p>
                  </div>
                </div>
              )
          )}
      </div>
    </div>
  );
};

export default ChatLeftUi;
