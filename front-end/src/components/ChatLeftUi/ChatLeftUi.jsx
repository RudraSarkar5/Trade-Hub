import { useEffect, useRef, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { socket } from "../../helper/socket";
import axios from "../../helper/axiosInstance";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFriends } from "../../redux/chatSlice";

const ChatLeftUi = ({ chatShow, show }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // this will track chat state
  const chatList = useSelector((state) => state.chat);
  
  // this state will contain all friends
  const [friendList, setFriendList] = useState([]);
 
  // this state will keep track the active friend chat 
  const [friendActiveId, setFriendActiveId] = useState(null);
  

  

  
  // this will fetch userDetails from localStorage
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  
  const handleClickOnFriend = (friend) => {
    navigate("/chat", { state: { friendDetails: friend } });
    setFriendActiveId(friend._id);
    if (friendActiveId == friend._id) {
      chatShow();
    } else {
      chatShow(true);
    }
  };

  useEffect(()=>{
    setFriendList(chatList.friends);
  },[chatList.friends])

  useEffect(() => {

    const fetchData =  () => {
       dispatch(fetchFriends());
      // setFriendList(action.payload.friends);
    };
      if(chatList.needApiCall){
        fetchData();
      }
    
  }, [chatList.needApiCall]);

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
              key={friend.friendId._id}
              onClick={() => handleClickOnFriend(friend.friendId)}
              className={`w-full h-fit  p-4 items-center flex gap-3 bg-gray-500 ${
                friendActiveId == friend.friendId._id
                  ? "md:bg-sky-700"
                  : "bg-gray-500"
              } rounded-lg`}
            >
              <img
                src={
                  friend.friendId?.avatar.public_id.length == 0
                    ? "./src/assets/avatar.png"
                    : friend.friendId?.avatar.secure_url
                }
                alt="friendPhoto"
                width={25}
                className="rounded-lg"
              />
              <div>
                <h1 className=" text-xl text-black">{friend.friendId.name}</h1>
                <p
                  className={` text-xl ${
                    friend.unRead ? "text-yellow-500 " : "text-white "
                  }`}
                >
                  {friend.lastMessage}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ChatLeftUi;
