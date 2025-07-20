// src/pages/SkillInputForm.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

export default function SkillInputForm() {
  const [skills, setSkills] = useState(['']);
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    const updated = [...skills];
    updated[index] = value;
    setSkills(updated);
  };

  const addSkill = () => {
    setSkills([...skills, '']);
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user) {
      toast.error('You must be logged in.');
      return;
    }

    const cleanedSkills = skills.map((s) => s.trim()).filter((s) => s);

    if (cleanedSkills.length === 0) {
      toast.error('Please enter at least one skill.');
      return;
    }

    try {
      await setDoc(doc(db, 'skills', user.uid), {
        skills: cleanedSkills,
      });
      toast.success('Skills saved successfully!');
      navigate('/matches');
    } catch (error) {
      console.error('Error saving skills:', error);
      toast.error('Failed to save skills.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Your Skills</h2>

        {skills.map((skill, idx) => (
          <div key={idx} className="flex items-center mb-4">
            <input
              type="text"
              value={skill}
              onChange={(e) => handleChange(idx, e.target.value)}
              placeholder={`Skill #${idx + 1}`}
              className="flex-grow px-4 py-2 border rounded mr-2"
              required
            />
            {skills.length > 1 && (
              <button
                type="button"
                onClick={() => removeSkill(idx)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addSkill}
          className="mb-6 text-blue-600 hover:underline"
        >
          + Add another skill
        </button>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Submit Skills
        </button>
      </form>
    </div>
  );
}
