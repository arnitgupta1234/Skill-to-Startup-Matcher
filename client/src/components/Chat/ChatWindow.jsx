import React from "react";
import MessageBubble from "./MessageBubble";

const ChatWindow = ({ messages, userId }) => (
  <div className="max-h-[60vh] overflow-y-auto p-4 border rounded-lg bg-white shadow mb-4">
    {messages.map((msg) => (
      <MessageBubble key={msg.id} message={msg} isOwn={msg.senderId === userId} />
    ))}
  </div>
);

export default ChatWindow;
