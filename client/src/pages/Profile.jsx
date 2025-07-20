// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProfileData(docSnap.data());
      } else {
        console.log("No profile data found");
      }
    };

    fetchProfile();
  }, [user]);

  if (!user) {
    return <p className="pt-20 text-center text-gray-600">Please log in to view your profile.</p>;
  }

  return (
    <motion.div
      className="min-h-screen bg-gray-50 pt-20 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-8">👤 Your Profile</h1>

        <div className="space-y-6 text-gray-700">
          <div>
            <h2 className="text-md font-semibold text-gray-500 uppercase">Name</h2>
            <p className="text-lg">{profileData?.name || <span className="italic text-gray-400">Not provided</span>}</p>
          </div>

          <div>
            <h2 className="text-md font-semibold text-gray-500 uppercase">Email</h2>
            <p className="text-lg">{user.email}</p>
          </div>

          <div>
            <h2 className="text-md font-semibold text-gray-500 uppercase">Bio</h2>
            <p className="text-lg">
              {profileData?.bio ? (
                profileData.bio
              ) : (
                <span className="italic text-gray-400">No bio added yet.</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
