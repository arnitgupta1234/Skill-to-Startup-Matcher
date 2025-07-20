// src/components/Board/TaskInput.jsx
import React, { useState } from "react";

const TaskInput = ({ onAdd }) => {
  const [text, setText] = useState("");

  const submit = () => {
    if (text.trim()) {
      onAdd(text.trim());
      setText("");
    }
  };

  return (
    <div className="mt-4">
      <input
        type="text"
        className="w-full border px-3 py-2 rounded mb-2 text-sm"
        placeholder="Add new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
      />
      <button
        onClick={submit}
        className="w-full bg-green-600 text-white py-1.5 rounded hover:bg-green-700 text-sm"
      >
        Add Task
      </button>
    </div>
  );
};

export default TaskInput;
