import { createContext, useEffect, useState } from "react";
import { socket } from "../helper/socket.js";
import { useDispatch , useSelector } from "react-redux";
import {getUserDetails} from "../redux/userSlice.js"
import { updateChatList } from "../redux/chatSlice.js";
export const chatContext = createContext(null);


const ContextProvider = ({ children }) => {

  const dispatch = useDispatch();
  
  const { isLoggedIn, isUpToDate, userData } = useSelector((state) => state.user);

  const socketSetUp = ()=>{
       socket.connect()
       socket.emit("join", userData._id);
  }

  const handleMessage = ({ senderId, receiverId, content, chatId }) => {
        if (userData._id == senderId || userData._id == receiverId) {
          dispatch(updateChatList());
        }
  }      

  useEffect(()=>{
    if ( !isUpToDate ){
      dispatch(getUserDetails());
    }
  },[isUpToDate]);

  useEffect(()=>{

     if (isLoggedIn) {
       socketSetUp();
     }

    if ( userData){
      socket.on("message", handleMessage);
    }
    
    return ()=>{
      socket.on("message", handleMessage);
    }
  },[socket,userData,isLoggedIn])

  return (
    <chatContext.Provider
      value={{
        // notification,
        // setNotification,
      }}
    >
      {children}
    </chatContext.Provider>
  );
};

export default ContextProvider;
