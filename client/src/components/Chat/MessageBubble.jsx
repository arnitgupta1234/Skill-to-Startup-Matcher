import React from "react";

const MessageBubble = ({ message, isOwn }) => {
  return (
    <div className={`flex mb-2 ${isOwn ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-xs px-4 py-2 rounded-lg text-white text-sm ${isOwn ? "bg-blue-600" : "bg-gray-600"}`}>
        {message.content}
      </div>
    </div>
  );
};

export default MessageBubble;
