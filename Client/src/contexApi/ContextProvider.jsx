import { createContext, useContext, useEffect, useState } from "react";
import { socket } from "../helper/socket.js";
import { useDispatch , useSelector } from "react-redux";
import {getUserDetails} from "../redux/userSlice.js"
import { updateChatList } from "../redux/chatSlice.js";
import axios from "../helper/axiosInstance.js";


export const chatContext = createContext(null);

const useSocket = ()=>{
  const contextValue = useContext(chatContext);
  return contextValue;
} 

const useNotification = ()=>{
  const contextValue = useContext(chatContext);
  return contextValue;
} 

const ContextProvider = ({ children }) => {

  const dispatch = useDispatch();
  const { isLoggedIn, isUpToDate, userData } = useSelector((state) => state.user);
  const [ socketConnected, setSocketConnected ] = useState(false);
  const [ notification, setNotification ] = useState(0);
  const [ modifyNofication , setModifyNotication ] = useState(true);

  const socketSetUp = ()=>{
       socket.connect();
       socket.on("connect",()=>{
          setSocketConnected(true);
       })
       socket.emit("join", userData._id);
  }

  const handleMessage = ({ senderId, receiverId, content, chatId }) => {
        if (userData._id == senderId || userData._id == receiverId) {
          dispatch(updateChatList());
        }
        if( userData._id != senderId && modifyNofication ){
           setNotification((pre)=>pre+1);
        }
  }      

  useEffect(()=>{
    if ( !isUpToDate ){
      dispatch(getUserDetails());
    }
  },[isUpToDate]);

  useEffect(() => {
    
    if (isLoggedIn) {
      socketSetUp();
      axios.get("/chats/get-notification")
      .then(({data})=>setNotification(data.data.notificationCount))
      .catch((err)=>console.log(err));
    }

    if (userData) {
      socket.on("message", handleMessage);
    }

    return () => {
      if (userData) {
        socket.off("message", handleMessage);
      }
    };
  }, [socket, userData, isLoggedIn]);

  return (
    <chatContext.Provider
      value={{
        socket,
        socketConnected,
        notification,
        setNotification,
        modifyNofication,
        setModifyNotication,
      }}
    >
      {children}
    </chatContext.Provider>
  );
};

export  { ContextProvider, useSocket, useNotification };
