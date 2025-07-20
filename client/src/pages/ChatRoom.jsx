import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useParams } from "react-router-dom";
import ChatWindow from "../components/Chat/ChatWindow";
import MessageInput from "../components/Chat/MessageInput";
import { subscribeToMessages, sendMessage } from "../services/chatService";

const ChatRoom = () => {
  const { chatId } = useParams();
  const user = auth.currentUser;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!chatId || !user) return;

    const unsubscribe = subscribeToMessages(chatId, setMessages);
    return () => unsubscribe();
  }, [chatId, user]);

  const handleSend = (content) => {
    if (content.trim()) {
      sendMessage(chatId, user.uid, content);
    }
  };

  if (!user) {
    return (
      <div className="pt-32 text-center text-gray-500">
        Please log in to access the chat.
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4 bg-gray-50">
      <h1 className="text-2xl font-semibold mb-4 text-center text-green-700">
        Chat Room
      </h1>
      <div className="max-w-3xl mx-auto">
        <ChatWindow messages={messages} userId={user.uid} />
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
};

export default ChatRoom;
