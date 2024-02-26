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
    
    setShowChat(!showChat);
  };

  return (
    <Layout>
      <div className="md:h-[85vh] h-[90vh] w-screen relative flex  bg-green-500">
        <ChatLeftUi show={showChat} chatShow={handleClick} />
        {showChat ? (
          <ChatBox friend={friendDetails} chatShow={handleClick} />
        ) : (
          <div className=" bg-green-500 hidden md:flex m-auto">
            Welcome to chat{" "}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Chat;
