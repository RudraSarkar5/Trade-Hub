import {  useState,useEffect } from "react";
import { IoMdArrowBack } from "react-icons/io";
import UserMessage from "../Messages/UserMessage";
import FriedMessage from "../Messages/FriendMessage";
import { Socket } from "socket.io-client";
import { socket } from "../../helper/socket";
import { useLocation, useParams } from "react-router-dom";
import Layout from "../../Layout/Layout";
import axios from "../../helper/axiosInstance";
import { makeUpDateFriendList } from "../../redux/chatSlice";
import { useDispatch } from "react-redux";

const ChatBox = ({friend=null,chatShow}) => {
   
  const [allMsg,setAllMsg] = useState([]);
  
  const dispatch = useDispatch();



  // this state is contain messgae
  const [msg,setMsg] = useState("");

  // by these two bellow line find senderId
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const myId = userDetails._id;

  // find the receiver Id 
  const receiverId = friend?friend._id:null;
  
// this function will send message
  const msgSend=()=>{
    if(msg.length == 0){
      return;
    }

    const data = {
      receiverId,
      senderId:myId,
      message:msg
    }

    axios.post("/chat/add-message",data)
    
    socket.emit("message", {
      message: msg,
      receiverId: receiverId,
      senderId: myId,
    });
    setMsg("");
  }
  
  
  
 useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/chat/get-message?senderId=${myId}&receiverId=${receiverId}`
        );

        if (response.data.success) {
          setAllMsg(response.data.messages);
        } else {
          navigate("/signup");
        }

        sockeFunction();
      } catch (error) {}
    };

    fetchData();
    
 },[receiverId])

 function scrollToLatestChats() {
   let chatBox = document.getElementsByClassName("chatBox")[0];
   console.log("scrollHeight:", chatBox.scrollHeight);
   console.log("clientHeight:", chatBox.clientHeight);
   chatBox.scrollTop = chatBox.scrollHeight;
 }


  useEffect(() => { 
     
      // Join a room based on the current user's ID
      socket.emit("join", myId);

      // Listen for incoming messages
      socket.on("message", ({ senderId, receiverId, message }) => {
        const msgObj = {
          senderId,
          content: message,
        };

        setAllMsg((msg) => [...msg, msgObj]);
        dispatch(makeUpDateFriendList({receiverId,message}));
        
      });
       console.log("enter useeffect");
       
    return () => {
      // Clean up event listeners
      socket.off("message");
    };
  }, []);

  useEffect(()=>{
    scrollToLatestChats();
  },[allMsg])


  

 return (
   <div className="md:w-2/3 w-full bg-gray-900 h-[100%]">
     <div className="w-full h-fit p-2 items-center flex gap-2 ">
       <IoMdArrowBack onClick={()=>chatShow(false)} className="md:hidden block"  />
       <img
         src={
           friend.avatar.public_id.length === 0
             ? "./src/assets/avatar.png"
             : friend.avatar.secure_url
         }
         alt="profile Photo"
         width={25}
         className="rounded-lg"
       />
       <h1>{friend && friend.name}</h1>
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


 