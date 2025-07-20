export default function StartupCard({ startup }) {
  return (
    <div className="border rounded-lg p-4 shadow bg-white hover:shadow-lg transition">
      <h3 className="text-xl font-semibold">{startup.name}</h3>
      <p className="text-sm text-gray-600">{startup.focusArea}</p>
      <p className="mt-2">{startup.description}</p>
      <p className="mt-2 text-sm">
        <strong>Required Skills:</strong> {startup.requiredSkills.join(", ")}
      </p>
      <p className="text-sm">
        <strong>Timing:</strong> {startup.timing}
      </p>
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Connect
      </button>
    </div>
  );
}
