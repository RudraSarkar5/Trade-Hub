import { useState, useEffect } from "react";
import { IoMdArrowBack } from "react-icons/io";
import UserMessage from "../Messages/UserMessage";
import FriedMessage from "../Messages/FriendMessage";

// import { socket } from "../../helper/socket";
import { useLocation, useParams } from "react-router-dom";
import Layout from "../../Layout/Layout";
import axios from "../../helper/axiosInstance";
import { useSocket } from "../../contexApi/ContextProvider";
import { useContext } from "react";
import { chatContext } from "../../contexApi/ContextProvider";
import { useDispatch, useSelector } from "react-redux";
import { clearCurrentChat, makeReadLastMessage } from "../../redux/chatSlice.js";
import { makeRead } from "../../../../Server/src/controllers/chat.controller.js";

const ChatBox = () => {
  const dispatch = useDispatch();

  const { socket, socketConnected } = useSocket();
  

  const { currentChat } = useSelector((state) => state.chat);
  
  const { userData } = useSelector((state) => state.user);
  const [msg, setMsg] = useState("");
  const [allMsg, setAllMsg] = useState([]);

  const msgSend = async () => {
    if (msg.length == 0) {
      return;
    }
    await axios.post(`/chats/add-message/${currentChat.chatId}`, {
      content: msg,
    });
    socket.emit("message", { 
      senderId : userData._id ,
      receiverId : currentChat?.chatFriend?._id ,
      chatId : currentChat?.chatId ,
      message : msg });
    setMsg("");
  };

  const messageHandler = ({ senderId, receiverId, content, chatId }) => {
    const msgObj = {
      senderId,
      content,
      chatId,
    };

    if (chatId == currentChat.chatId) {
      setAllMsg((prev) => [...prev, msgObj]);
    }
  };

  function scrollToLatestChats() {
    let chatBox = document.getElementsByClassName("chatBox")[0];
    chatBox.scrollTop = chatBox.scrollHeight;
  }
  // this is for automatic scroll down to show last messages
  useEffect(() => {
    scrollToLatestChats();
  }, [allMsg]);

  useEffect(() => {
    if (currentChat) {
      axios
        .get(`/chats/get-messages/${currentChat.chatId}`)
        .then(({ data }) => setAllMsg(data.allMessages))
        .catch((err) => console.log(err.message));
    }
    if (currentChat?.chatId && userData) {
      socket.emit("setConnection", {
        myId: userData._id,
        chatId : currentChat.chatId,
      });
    }

    if (currentChat?.needMarkRead){
      dispatch(makeReadLastMessage({chatId : currentChat.chatId}));
    }

    return () => {
      if ( userData ) {
        socket.emit("destroyConnection", {
          myId: userData._id,
        });
      }
      dispatch(clearCurrentChat());
      if(currentChat){

        // this api call will delete chat record if the particular chat have no message
        axios.delete(`/chats/check-empty-chat/${currentChat.chatId}`);

      }
    };
  }, [currentChat, userData]);

  useEffect(() => {
    // Listen for incoming messages
    socket.on("message", messageHandler );
    
    return ()=>{
      socket.off("message", messageHandler);
    }
  }, [socket]);

  return (
    <div className="md:w-2/3 w-full bg-gray-900 h-[100%]">
      <div className="w-full h-fit p-2 items-center flex gap-2 ">
        <IoMdArrowBack
          onClick={() => dispatch(clearCurrentChat())}
          className="md:hidden block"
        />
        <img
          src={
            currentChat?.chatFriend?.avatar?.userUploaded == false
              ? "./src/assets/avatar.png"
              : currentChat?.chatFriend?.avatar.secure_url
          }
          alt="profile Photo"
          width={25}
          className="rounded-lg"
        />
        <h1>{currentChat?.chatFriend?.name}</h1>
      </div>

      <div className="w-full bg-gray-500 overflow-y-scroll h-[85%] md:h-[80%] chatBox space-y-2">
        {allMsg.length > 0 &&
          allMsg.map((message, idx) => {
            if (message.senderId == userData?._id) {
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
