import React from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const TaskCard = ({ title, taskId, status }) => {
  const updateStatus = async (newStatus) => {
    await updateDoc(doc(db, "tasks", taskId), { status: newStatus });
  };

  const nextStatus =
    status === "To Do" ? "In Progress" : status === "In Progress" ? "Done" : null;

  return (
    <div className="bg-gray-100 p-3 rounded-md shadow mb-3">
      <p className="text-gray-700 font-medium">{title}</p>
      {nextStatus && (
        <button
          onClick={() => updateStatus(nextStatus)}
          className="mt-2 text-sm text-blue-600 hover:underline"
        >
          ➡ Move to {nextStatus}
        </button>
      )}
    </div>
  );
};

export default TaskCard;
