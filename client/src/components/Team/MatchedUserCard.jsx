// src/components/Team/MatchedUserCard.jsx
import React from 'react';
import axios from 'axios';

const MatchedUserCard = ({ user, currentUserUid }) => {
  const handleSendRequest = async () => {
    try {
      await axios.post('/api/team/send', {
        fromUid: currentUserUid,
        toUid: user.uid,
      });
      alert('Request sent!');
    } catch (err) {
      console.error(err);
      alert('Failed to send request');
    }
  };

  return (
    <div className="border p-4 rounded-xl shadow bg-white">
      <h2 className="text-lg font-semibold">{user.name}</h2>
      <p>{user.email}</p>
      <button
        onClick={handleSendRequest}
        className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Send Request
      </button>
    </div>
  );
};

export default MatchedUserCard;
