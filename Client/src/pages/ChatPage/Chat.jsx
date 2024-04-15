import React, { useState,useEffect } from "react";
import ChatBox from "../../components/ChatBox/ChatBox";
import ChatLeftUi from "../../components/ChatLeftUi/ChatLeftUi";
import Layout from "../../Layout/Layout";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Chat = () => {

  const [showChat, setShowChat] = useState(false);
  
  const {state} = useLocation();
  
  const friendDetails = state?state.friendDetails:null;
  const onlyChatBox = state?state.onlyChatBox:null;

  const { showChatBox } = useSelector((state)=>state.chat)

  console.log(showChatBox);

  useEffect(() => {
    if (showChatBox) {
      setShowChat(true);
    }else{
      setShowChat(false);
    }
  }, [showChatBox]);

  // if (showChatBox) {
  //   setShowChat(true);
  // }
  

  // useEffect(()=>{
  //   if(!state){
  //     setShowChat(false)
  //   }
  // },[state])
 

  // useEffect(() => {
  //   if (onlyChatBox) {
  //     setShowChat(true);
  //   }
  // }, [onlyChatBox]);


  
  const handleClick = (value = !showChat) => {
    setShowChat(value);
  };

  return (
    <Layout>
      <div className="md:h-[85vh] h-[90vh] w-screen relative flex gap-2  bg-green-900">
        <ChatLeftUi showBox = {showChat}  />
        {showChat ? (
          <ChatBox chatShow={handleClick} />
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
