import {  useState,useEffect } from "react";
import { IoMdArrowBack } from "react-icons/io";
import UserMessage from "../Messages/UserMessage";
import FriedMessage from "../Messages/FriendMessage";
import { Socket } from "socket.io-client";
import { socket } from "../../helper/socket";
import { useLocation, useParams } from "react-router-dom";
import Layout from "../../Layout/Layout";
import axios from "../../helper/axiosInstance";

const ChatBox = ({friend=null,chatShow}) => {
   
  const [allMsg,setAllMsg] = useState([]);
  
  // this id refers to receiverId
  // const {id} = useParams();



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

    axios.post("/chat/add-message",data).then(()=>console.log("all good")).catch((e)=>console.log(e))
    
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
          console.log(response.data);
          setAllMsg(response.data.messages);
        } else {
          navigate("/signup");
        }

        sockeFunction();
      } catch (error) {}
    };

    fetchData();
 },[receiverId])

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
      });
       
    return () => {
      // Clean up event listeners
      socket.off("message");
    };
  }, []);


  

 return (
   <div className="md:w-2/3 w-full bg-yellow-500 h-[100%]">
     <div className="w-full h-fit p-2 items-center flex gap-2 ">
       <IoMdArrowBack onClick={chatShow} className="md:hidden block"  />
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

     <div className="w-full bg-gray-500 overflow-y-scroll  h-[80%] space-y-2">
                 {allMsg.length > 0 &&
                   allMsg.map((message, idx) => {
                     console.log(message.content);
                     if (message.senderId == myId) {
                       console.log("enter to sender");
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
                   className="p-2 w-[80%]"
                   value={msg}
                 />
                 <button
                   onClick={msgSend}
                   className="bg-blue-500 text-white p-2"
                 >
                   send
                 </button>
               </div>
   </div>
 );   
};

export default ChatBox;


 