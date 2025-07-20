// src/components/Team/TeamRequests.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TeamRequests = ({ currentUserUid }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const res = await axios.get(`/api/team/received/${currentUserUid}`);
      setRequests(res.data.requests);
    };
    fetchRequests();
  }, [currentUserUid]);

  const handleUpdate = async (id, status) => {
    try {
      await axios.patch('/api/team/status', { requestId: id, status });
      setRequests((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-2">Incoming Team Requests</h3>
      {requests.map((req) => (
        <div key={req.id} className="p-3 border rounded mb-2 bg-white shadow">
          <p>From: {req.fromUid}</p>
          <button
            onClick={() => handleUpdate(req.id, 'accepted')}
            className="bg-green-600 text-white px-3 py-1 rounded mr-2"
          >
            Accept
          </button>
          <button
            onClick={() => handleUpdate(req.id, 'rejected')}
            className="bg-red-600 text-white px-3 py-1 rounded"
          >
            Reject
          </button>
        </div>
      ))}
    </div>
  );
};

export default TeamRequests;
