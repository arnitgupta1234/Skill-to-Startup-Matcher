import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { addStartup, getStartupsByUser } from "../firebase/firestore";
import toast from "react-hot-toast";

export default function AdminPanel() {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    focusArea: "",
    description: "",
    requiredSkills: "",
    timing: "Part-time",
  });
  const [userStartups, setUserStartups] = useState([]);

  useEffect(() => {
    if (currentUser) {
      getStartupsByUser(currentUser.uid).then(setUserStartups);
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      focusArea: "",
      description: "",
      requiredSkills: "",
      timing: "Part-time",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        requiredSkills: formData.requiredSkills
          .split(",")
          .map((s) => s.trim()),
        createdBy: currentUser.uid,
      };
      await addStartup(data);
      toast.success("Startup posted successfully!");
      resetForm();
      const updated = await getStartupsByUser(currentUser.uid);
      setUserStartups(updated);
    } catch (error) {
      toast.error("Failed to post startup: " + error.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">
        Post a New Startup Opportunity
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow">
        <div>
          <label className="block font-medium text-gray-700 mb-1">Startup Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">Focus Area</label>
          <input
            name="focusArea"
            value={formData.focusArea}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">Required Skills</label>
          <input
            name="requiredSkills"
            placeholder="e.g., React, Firebase"
            value={formData.requiredSkills}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">Timing</label>
          <select
            name="timing"
            value={formData.timing}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Part-time">Part-time</option>
            <option value="Full-time">Full-time</option>
            <option value="Weekends only">Weekends only</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          Submit
        </button>
      </form>

      <hr className="my-8" />

      <h3 className="text-2xl font-semibold mb-4 text-gray-800">Your Posted Startups</h3>
      {userStartups.length > 0 ? (
        <ul className="space-y-4">
          {userStartups.map((s) => (
            <li
              key={s.id}
              className="bg-white p-4 rounded-lg shadow border"
            >
              <h4 className="text-lg font-bold text-blue-700">{s.name}</h4>
              <p className="text-gray-600 text-sm">{s.focusArea}</p>
              <p className="text-sm text-gray-500 mt-1">
                Skills: {s.requiredSkills.join(", ")}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">You haven’t posted any startups yet.</p>
      )}
    </div>
  );
}
