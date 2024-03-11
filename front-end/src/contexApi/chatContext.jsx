import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "../helper/axiosInstance";

export const chatContext = createContext();
 const socket = io(import.meta.env.VITE_BACK_END_URL);

const ContextProvider = ({ children }) => {
 
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const myId = userDetails ? userDetails._id : null;

  const [friends, setFriends] = useState([]);
  const [notification, setNotification] = useState(0);
  const [selectedFriend, setSelectedFriend] = useState(null);



  const fetchFriends = async () => {
    try {
      socket.emit("join", myId);
      console.log("connected socket");
      const response = await axios.get("/chat/get-friends");
      const { friends, notification } = response.data; 
      setFriends(friends);
      setNotification(notification);
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (myId) {
        await fetchFriends();
        socket.on("message",async ({receiverId,senderId,message})=>{
          await fetchFriends();
        })
      }
    };
    fetchData();
  }, [socket]);

  return (
    <chatContext.Provider
      value={{
        socket,
        friends,
        notification,
        setNotification,
        selectedFriend,
        setSelectedFriend,
      }}
    >
      {children}
    </chatContext.Provider>
  );
};

export default ContextProvider;
