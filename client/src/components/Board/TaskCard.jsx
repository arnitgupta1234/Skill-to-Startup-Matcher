// src/components/Board/TaskCard.jsx
import React from "react";

const TaskCard = ({ task, column }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("task", JSON.stringify({ task, from: column }));
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="p-3 rounded-xl bg-gray-200 hover:bg-gray-300 text-sm shadow-sm cursor-grab"
    >
      {task.content}
    </div>
  );
};

export default TaskCard;
