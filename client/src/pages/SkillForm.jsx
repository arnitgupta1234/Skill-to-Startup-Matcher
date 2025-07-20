// src/pages/SkillForm.jsx
import React, { useState } from 'react';
import { db, auth } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const SkillForm = () => {
  const [skills, setSkills] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      toast.error('You must be logged in.');
      return;
    }

    try {
      setLoading(true);
      await setDoc(doc(db, 'skills', user.uid), {
        skills: skills.split(',').map((skill) => skill.trim().toLowerCase()),
      });
      toast.success('Skills submitted!');
      setSkills('');
    } catch (error) {
      toast.error('Failed to save skills: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="max-w-xl mx-auto mt-16 p-6 bg-white rounded-xl shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Enter Your Skills</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
            Skills <span className="text-gray-400">(comma-separated)</span>
          </label>
          <textarea
            id="skills"
            rows="4"
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. React, Firebase, UI/UX"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 px-4 rounded-lg ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </motion.div>
  );
};

export default SkillForm;
