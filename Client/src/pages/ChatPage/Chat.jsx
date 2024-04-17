import React, { useState,useEffect } from "react";
import ChatBox from "../../components/ChatBox/ChatBox";
import ChatLeftUi from "../../components/ChatLeftUi/ChatLeftUi";
import Layout from "../../Layout/Layout";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNotification } from "../../contexApi/ContextProvider";
// import 

const Chat = () => {

  const { setModifyNotication, setNotification } = useNotification();
  const { showChatBox } = useSelector((state)=>state.chat)
  
  const [showChat, setShowChat] = useState(false);
  
  useEffect(() => {
    if (showChatBox) {
      setShowChat(true);
    }else{
      setShowChat(false);
    }
  }, [showChatBox]);

  useEffect (()=>{
    setModifyNotication(true);
    setNotification(0);
    return ()=>{
      setModifyNotication(false);
    }
  })


  return (
    <Layout>
      <div className="md:h-[85vh] h-[90vh] w-screen relative flex gap-2  bg-green-900">
        <ChatLeftUi showBox = {showChat}  />
        {showChat ? (
          <ChatBox />
        ) : (
          <div className=" bg-green-900 hidden md:flex m-auto">
            Welcome to chat{" "}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Chat;
