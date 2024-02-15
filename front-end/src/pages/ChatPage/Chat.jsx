import React, { useState } from "react";
import ChatBox from "../../components/ChatBox/ChatBox";
import ChatLeftUi from "../../components/ChatLeftUi/ChatLeftUi";
import Layout from "../../Layout/Layout";

const Chat = () => {
  
  const [showChat, setShowChat] = useState(false);

  const handleClick =()=>{
    console.log("enter");
    setShowChat(!showChat);
  }
 

  return (
    <Layout>
      <div className="h-screen w-screen flex ">
        <ChatLeftUi chatShow={handleClick} smallScreen={false} />
        {showChat ? (
          <ChatBox chatShow={handleClick} />
        ) : (
          <ChatLeftUi chatShow={handleClick} />
        )}
      </div>
    </Layout>
  );
};

export default Chat;
