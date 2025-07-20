// src/components/Chat/Message.jsx
import React from "react";
import { auth } from "../../firebase";

const Message = ({ msg }) => {
  const isOwn = msg.uid === auth.currentUser?.uid;

  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
      <div
        className={`p-2 rounded-lg max-w-xs text-sm ${
          isOwn ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-700"
        }`}
      >
        {!isOwn && <p className="font-semibold">{msg.displayName}</p>}
        <p>{msg.text}</p>
      </div>
    </div>
  );
};

export default Message;
