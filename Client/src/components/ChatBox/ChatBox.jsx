import { useState, useEffect } from "react";
import { IoMdArrowBack } from "react-icons/io";
import UserMessage from "../Messages/UserMessage";
import FriedMessage from "../Messages/FriendMessage";

// import { socket } from "../../helper/socket";
import { useLocation, useParams } from "react-router-dom";
import Layout from "../../Layout/Layout";
import axios from "../../helper/axiosInstance";

import { useContext } from "react";
import { chatContext } from "../../contexApi/ContextProvider";
import { useSelector } from "react-redux";

const ChatBox = ({ friend = null, chatShow }) => {

  const { currentChatId } = useSelector((state) => state.chat);
  const [allMsg, setAllMsg] = useState([]);

  const { selectedFriend, socket, friends, notification, setNotification } =
    useContext(chatContext);


  // this state is contain messgae
  const [msg, setMsg] = useState("");

  // by these two bellow line find senderId
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const myId = userDetails._id;

  const currentFriend = selectedFriend;

  // find the receiver Id
  let currentFriendId = currentFriend ? currentFriend._id : null;

  // this function will send message
  const msgSend = async () => {
    if (msg.length == 0) {
      return;
    }

    const data = {
      receiverId: currentFriendId,
      senderId: myId,
      message: msg,
    };

    await axios.post("/chat/add-message", data);
    socket.emit("message", data);

    setMsg("");
  };

  useEffect(() => {
    socket.emit("setConnection", { myId, friendId: currentFriendId });

    const fetchData = async () => {
      const { data } = await axios.post("/chat/make-read", {
        senderId: myId,
        receiverId: currentFriendId,
      });

      friends.find((friend) => {
        if (friend.friendId._id == data.receiverId) {
          if (friend.unRead == true) {
            friend.unRead = false;
            setNotification(notification - 1);
          }
        }
      });

      const response = await axios.get(
        `/chat/get-message?senderId=${myId}&receiverId=${currentFriendId}`
      );

      setAllMsg(response.data.messages);
    };

    // this function will fetch all message between current friend and user

    if (currentFriendId) {
      fetchData();
    }

    // return ()=>{
    //   socket.emit("destroyConnection",{myId,friendId:currentFriendId});
    // }
  }, [selectedFriend]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      // Emit the destroyConnection event
      socket.emit("destroyConnection", { myId, friendId: currentFriendId });
    };

    // Add the event listener
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Clean up the event listener
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [socket, myId, currentFriendId]);

  useEffect(() => {
    // Listen for incoming messages
    socket.on("message", ({ senderId, receiverId, message }) => {
      const msgObj = {
        senderId,
        content: message,
      };

      if (senderId == myId || senderId == currentFriendId) {
        setAllMsg((prev) => [...prev, msgObj]);
      }
    });
  }, [socket]);

  function scrollToLatestChats() {
    let chatBox = document.getElementsByClassName("chatBox")[0];
    chatBox.scrollTop = chatBox.scrollHeight;
  }
  // this is for automatic scroll down to show last messages
  useEffect(() => {
    scrollToLatestChats();
  }, [allMsg]);

  useEffect(()=>{
    if(currentChatId){
        axios
          .get(`/chats/get-messages/${currentChatId}`)
          .then(({ data }) => setMsg(data.allMessages))
          .catch((err)=>console.log(err.message));
    }
  },[currentChatId])

  return (
    <div className="md:w-2/3 w-full bg-gray-900 h-[100%]">
      <div className="w-full h-fit p-2 items-center flex gap-2 ">
        <IoMdArrowBack
          onClick={() => chatShow(false)}
          className="md:hidden block"
        />
        <img
          src={
            currentFriend?.avatar.public_id.length === 0
              ? "./src/assets/avatar.png"
              : currentFriend?.avatar.secure_url
          }
          alt="profile Photo"
          width={25}
          className="rounded-lg"
        />
        <h1>{currentFriend && currentFriend.name}</h1>
      </div>

      <div className="w-full bg-gray-500 overflow-y-scroll h-[85%] md:h-[80%] chatBox space-y-2">
        {allMsg.length > 0 &&
          allMsg.map((message, idx) => {
            if (message.senderId == myId) {
              return <UserMessage key={idx} msg={message.content} />;
            } else {
              return <FriedMessage key={idx} msg={message.content} />;
            }
          })}
      </div>

      <div className="w-full  h-fit m-2 flex justify-center items-center gap-2">
        <input
          onChange={(e) => {
            setMsg(e.target.value);
          }}
          type="text"
          placeholder="write your message"
          className="p-2 rounded-xl w-[70%] md:w-[80%]"
          value={msg}
        />
        <button
          onClick={msgSend}
          className="bg-blue-800 rounded-lg  text-white py-2 px-4"
        >
          send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
