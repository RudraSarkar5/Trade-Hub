import React, { useState } from "react";
import ChatBox from "../../components/ChatBox/ChatBox";
import ChatLeftUi from "../../components/ChatLeftUi/ChatLeftUi";

const Chat = () => {
  
  const [showChat, setShowChat] = useState(false);

  const handleClick =()=>{
    console.log("enter");
    setShowChat(!showChat);
  }
 

  return (
    <div className="h-screen w-screen flex ">
      <ChatLeftUi chatShow={handleClick} smallScreen={false} />
      {showChat ? <ChatBox chatShow={handleClick} /> : <ChatLeftUi chatShow={handleClick} />}
    </div>
  );
};

export default Chat;
