// src/components/Chat/ChatBox.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db, auth } from "../../firebase";
import Message from "./Message";

const ChatBox = ({ projectId }) => {
  const [newMsg, setNewMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef();

  useEffect(() => {
    const q = query(
      collection(db, "projects", projectId, "messages"),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    });

    return () => unsubscribe();
  }, [projectId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || !newMsg.trim()) return;

    await addDoc(collection(db, "projects", projectId, "messages"), {
      text: newMsg,
      uid: user.uid,
      displayName: user.displayName || "Anonymous",
      createdAt: serverTimestamp(),
    });

    setNewMsg("");
  };

  return (
    <div className="border rounded-xl shadow p-4 bg-white h-[400px] flex flex-col">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">💬 Project Chat</h2>
      <div className="flex-1 overflow-y-auto space-y-2 mb-2 px-2">
        {messages.map((msg) => (
          <Message key={msg.id} msg={msg} />
        ))}
        <div ref={bottomRef}></div>
      </div>
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          type="text"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border rounded px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
