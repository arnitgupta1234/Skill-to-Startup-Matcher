// src/components/Team/TeammatesList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TeammatesList = ({ currentUserUid }) => {
  const [teammates, setTeammates] = useState([]);

  useEffect(() => {
    const fetchTeammates = async () => {
      const res = await axios.get(`/api/team/teammates/${currentUserUid}`);
      setTeammates(res.data.teammates);
    };
    fetchTeammates();
  }, [currentUserUid]);

  return (
    <div>
      <h3 className="text-xl font-bold mb-2">Your Teammates</h3>
      <ul className="list-disc pl-5">
        {teammates.map((uid) => (
          <li key={uid}>{uid}</li>
        ))}
      </ul>
    </div>
  );
};

export default TeammatesList;
