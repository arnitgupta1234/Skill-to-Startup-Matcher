// src/pages/ProjectBoard.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BoardColumn from "../components/Board/BoardColumn";
import ChatBox from "../components/Chat/ChatBox";
import {
  subscribeToBoard,
  updateBoardColumns,
  initBoardIfNeeded,
} from "../services/boardService";

const ProjectBoard = () => {
  const { projectId } = useParams();
  const [columns, setColumns] = useState({
    todo: [],
    inprogress: [],
    done: [],
  });

  useEffect(() => {
    if (!projectId) return;

    // Ensure the board is initialized in Firestore
    initBoardIfNeeded(projectId);

    // Subscribe to real-time updates
    const unsubscribe = subscribeToBoard(projectId, (data) => {
      if (data) setColumns(data);
    });

    return () => unsubscribe();
  }, [projectId]);

  // Move task between columns
  const handleDrop = (task, from, to) => {
    if (from === to) return;

    const updatedColumns = {
      ...columns,
      [from]: columns[from].filter((t) => t.id !== task.id),
      [to]: [...columns[to], task],
    };

    setColumns(updatedColumns);
    updateBoardColumns(projectId, updatedColumns);
  };

  // Add a new task
  const handleAddTask = (column, task) => {
    const updated = {
      ...columns,
      [column]: [...columns[column], task],
    };

    setColumns(updated);
    updateBoardColumns(projectId, updated);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-24">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
        Project Board
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {["todo", "inprogress", "done"].map((key) => (
          <BoardColumn
            key={key}
            title={key}
            tasks={columns[key]}
            onDrop={handleDrop}
            onAdd={handleAddTask}
          />
        ))}
      </div>

      {/* Chat Section */}
      <div className="mt-10 max-w-4xl mx-auto">
        <ChatBox projectId={projectId} />
      </div>
    </div>
  );
};

export default ProjectBoard;
