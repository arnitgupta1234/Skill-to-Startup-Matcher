// src/components/Board/BoardColumn.jsx
import React from "react";
import TaskCard from "./TaskCard";
import TaskInput from "./TaskInput";

const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

const BoardColumn = ({ title, tasks, onDrop, onAdd }) => {
  const handleDrop = (e) => {
    const data = JSON.parse(e.dataTransfer.getData("task"));
    onDrop(data.task, data.from, title);
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="bg-white p-4 rounded-2xl shadow min-h-[300px] flex flex-col"
    >
      <h2 className="text-xl font-semibold mb-3 text-gray-700">
        {capitalize(title)}
      </h2>
      <div className="flex-1 space-y-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} column={title} />
        ))}
      </div>
      <TaskInput onAdd={(text) =>
        onAdd(title, { id: Date.now().toString(), content: text })
      } />
    </div>
  );
};

export default BoardColumn;
