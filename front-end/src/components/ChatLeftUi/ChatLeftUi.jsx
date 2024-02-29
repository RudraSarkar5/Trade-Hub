import { useEffect, useRef, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { socket } from "../../helper/socket";
import axios from "../../helper/axiosInstance";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFriends } from "../../redux/chatSlice";

const ChatLeftUi = ({ chatShow, show }) => {
  
  const dispatch = useDispatch();
 

  const chatList = useSelector((state)=>state.chat);

  const [friendList, setFriendList] = useState([]);

  const [friendActiveId, setFriendActiveId] = useState(null);

  const divRef = useRef(null);

  const navigate = useNavigate();

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  const handleClickOnFriend = (friend) => {
    navigate("/chat", { state: { friendDetails: friend } });
    setFriendActiveId(friend._id);
    if(friendActiveId == friend._id){
      chatShow();
    }else{
      chatShow(true)
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      
      const action = await dispatch(fetchFriends());
      console.log("enter");
      
      setFriendList(action.payload.friends);
    };

    fetchData();
    
  }, [chatList.upToDate]);

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
              ref={divRef}
              key={friend.participant[0]._id}
              onClick={() => handleClickOnFriend(friend.participant[0])}
              className={`w-full h-fit  p-4 items-center flex gap-3 ${
                friendActiveId == friend.participant[0]._id
                  ? "bg-sky-700"
                  : "bg-gray-500"
              } rounded-lg`}
            >
              <img
                src={
                  friend.participant[0]?.avatar.public_id.length == 0
                    ? "./src/assets/avatar.png"
                    : friend.participant[0]?.avatar.secure_url
                }
                alt="friendPhoto"
                width={25}
                className="rounded-lg"
              />
              <div>
                <h1 className=" text-xl text-black">
                  {friend.participant[0].name}
                </h1>
                <p className=" text-xs text-white">{friend.lastMessage.substring(0,40)}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ChatLeftUi;
