import React, { useState,useEffect } from "react";
import ChatBox from "../../components/ChatBox/ChatBox";
import ChatLeftUi from "../../components/ChatLeftUi/ChatLeftUi";
import Layout from "../../Layout/Layout";



const Chat = () => {
  const [showChat, setShowChat] = useState(false);
  

  

  const handleClick = () => {
    
    setShowChat(!showChat);
  };

  

  return (
    <Layout>
      <div className="h-full pb-5 w-screen flex ">
        <ChatLeftUi chatShow={handleClick} smallScreen={false} />
        {!showChat && (
          <div className="md:flex w-2/3 justify-center items-center bg-green-500 text-black hidden">
            Welcome to chatBox!
          </div>
        )}
        {showChat ? (
          <ChatBox  chatShow={handleClick} />
        ) : (
          <ChatLeftUi chatShow={handleClick} />
        )}
      </div>
    </Layout>
  );
};

export default Chat;
