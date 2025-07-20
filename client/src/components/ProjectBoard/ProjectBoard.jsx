import React, { useState } from "react";
import TaskColumn from "./TaskColumn";
import CreateTaskModal from "./CreateTaskModal";
import { auth } from "../../firebase";

const ProjectBoard = () => {
  const [showModal, setShowModal] = useState(false);
  const user = auth.currentUser;

  if (!user) {
    return (
      <div className="pt-32 text-center text-gray-600">
        <p>Please log in to view the Project Board.</p>
      </div>
    );
  }

  const columns = ["To Do", "In Progress", "Done"];

  return (
    <div className="pt-24 px-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center max-w-6xl mx-auto mb-6">
        <h1 className="text-3xl font-bold text-green-700">🛠 Project Board</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
        >
          + New Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {columns.map((column) => (
          <TaskColumn key={column} title={column} />
        ))}
      </div>

      {showModal && <CreateTaskModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default ProjectBoard;
