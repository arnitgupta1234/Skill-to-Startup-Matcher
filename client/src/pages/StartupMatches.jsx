// src/pages/StartupMatches.jsx
import { useEffect, useState } from 'react';

export default function StartupMatches() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    // For now, we use mock data
    const mockMatches = [
      {
        id: 1,
        name: 'TechSpark',
        description: 'An ed-tech startup building AI-based tools for students.',
        skillsRequired: ['React', 'Node.js', 'MongoDB'],
        contact: 'techspark@example.com',
      },
      {
        id: 2,
        name: 'HealthTrack',
        description: 'Startup focused on real-time fitness analytics.',
        skillsRequired: ['Python', 'TensorFlow', 'Data Science'],
        contact: 'hr@healthtrack.com',
      },
      {
        id: 3,
        name: 'GreenChain',
        description: 'Blockchain for sustainable supply chains.',
        skillsRequired: ['Solidity', 'React', 'Web3.js'],
        contact: 'join@greenchain.io',
      },
    ];

    setMatches(mockMatches);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Startup Matches for You</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {matches.map((startup) => (
          <div key={startup.id} className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition">
            <h2 className="text-xl font-bold text-blue-700">{startup.name}</h2>
            <p className="text-gray-700 mt-2">{startup.description}</p>

            <div className="mt-4">
              <p className="font-semibold">Required Skills:</p>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {startup.skillsRequired.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-500">📧 {startup.contact}</p>
              <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Apply / Contact
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
