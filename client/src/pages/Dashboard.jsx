// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";

import MatchedUserCard from "../components/Team/MatchedUserCard";
import TeamRequests from "../components/Team/TeamRequests";
import TeammatesList from "../components/Team/TeammatesList";

const Dashboard = () => {
  const user = auth.currentUser;
  const [skills, setSkills] = useState([]);
  const [matches, setMatches] = useState([]);
  const [matchedUsers, setMatchedUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        setSkills(data.skills || []);
        setMatches(data.matchedStartups || []);

        // Fetch matched users from backend
        try {
          const res = await fetch(`/api/match/users/${user.uid}`);
          const json = await res.json();
          setMatchedUsers(json.matchedUsers || []);
        } catch (error) {
          console.error("Failed to fetch matched users:", error);
        }
      }
    };

    fetchData();
  }, [user]);

  if (!user) {
    return (
      <div className="pt-32 text-center text-gray-600">
        <p>Please log in to view your dashboard.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          className="text-4xl font-bold mb-10 text-green-700 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Welcome to Your Dashboard
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Skills Box */}
          <motion.div
            className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              🧠 Your Skills
            </h2>
            {skills.length > 0 ? (
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">You haven't added any skills yet.</p>
            )}
          </motion.div>

          {/* Matches Box */}
          <motion.div
            className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              🚀 Matched Startups
            </h2>
            {matches.length > 0 ? (
              <ul className="text-gray-700 space-y-1">
                {matches.map((startup, index) => (
                  <li key={index}>🔗 {startup}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">
                No matches found. Add skills to see startup suggestions!
              </p>
            )}
          </motion.div>
        </div>

        {/* Team Building Section */}
        <motion.div
          className="bg-white rounded-2xl shadow p-6 mt-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            👥 Build Your Team
          </h2>

          {/* Matched Users */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {matchedUsers.length > 0 ? (
              matchedUsers.map((userObj) => (
                <MatchedUserCard
                  key={userObj.uid}
                  user={userObj}
                  currentUserUid={user.uid}
                />
              ))
            ) : (
              <p className="text-gray-500">No matching users found.</p>
            )}
          </div>

          {/* Requests & Teammates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TeamRequests currentUserUid={user.uid} />
            <TeammatesList currentUserUid={user.uid} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
