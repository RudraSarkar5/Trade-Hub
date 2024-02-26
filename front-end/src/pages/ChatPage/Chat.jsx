import React, { useState,useEffect } from "react";
import ChatBox from "../../components/ChatBox/ChatBox";
import ChatLeftUi from "../../components/ChatLeftUi/ChatLeftUi";
import Layout from "../../Layout/Layout";
import { useLocation } from "react-router-dom";



const Chat = () => {
  const [showChat, setShowChat] = useState(false);
  

  const {state} = useLocation();
  
  const friendDetails = state?state.friendDetails:null;
  

  const handleClick = () => {
    
    setShowChat(true);
  };

  

  return (
    <Layout>
      <div className="h-[85vh] w-screen relative flex  bg-green-500">
        <ChatLeftUi chatShow={handleClick} />
        {showChat ? (
          <ChatBox friend = {friendDetails}  />
        ) : (
          <div className=" bg-green-500 m-auto">Welcome to chat </div>
        )}
      </div>
    </Layout>
  );
};

export default Chat;
