/* tslint:disable */
import React from "react";
import ComposeBox from "./ComposeBox";
import HeaderBox from "./HeaderBox";
import ConversationDetail from "./ConversationDetail";

const ChatContainer = () => {
  return (
    <div className="w-1/3 h-screen border-2 border-black">
      <HeaderBox />
      <ConversationDetail />
      <ComposeBox />
    </div>
  );
};

export default ChatContainer;
