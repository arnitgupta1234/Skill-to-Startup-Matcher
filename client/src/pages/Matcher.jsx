import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserSkills } from "../firebase/firestore";
import { startups } from "../data/startups";
import StartupCard from "../components/StartupCard";

export default function Matcher() {
  const { currentUser } = useAuth();
  const [userSkills, setUserSkills] = useState(null);
  const [matchedStartups, setMatchedStartups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMatches = async () => {
      if (!currentUser) return;

      try {
        const profile = await getUserSkills(currentUser.uid);
        setUserSkills(profile);

        const matches = startups.filter((startup) => {
          const skillMatch = startup.requiredSkills.some((skill) =>
            profile.skills.includes(skill)
          );
          const timingMatch = startup.timing === profile.availability;

          return skillMatch && timingMatch;
        });

        setMatchedStartups(matches);
      } catch (error) {
        console.error("Error fetching matches:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMatches();
  }, [currentUser]);

  if (loading) return <div className="p-6 text-gray-500">🔄 Loading matches...</div>;

  if (!userSkills?.skills?.length) {
    return (
      <div className="p-6 text-gray-600">
        You haven’t added your skills yet. Go to your profile to add them.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">
        Matched Startups for You
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {matchedStartups.length > 0 ? (
          matchedStartups.map((startup) => (
            <StartupCard key={startup.id} startup={startup} />
          ))
        ) : (
          <p className="text-gray-500">
            No perfect matches yet. Try updating your skills or availability.
          </p>
        )}
      </div>
    </div>
  );
}
