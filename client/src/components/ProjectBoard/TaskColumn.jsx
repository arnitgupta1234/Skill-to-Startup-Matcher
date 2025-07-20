import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db, auth } from "../../firebase";
import TaskCard from "./TaskCard";

const TaskColumn = ({ title }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, "tasks"),
      where("userId", "==", user.uid),
      where("status", "==", title)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedTasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(updatedTasks);
    });

    return () => unsubscribe();
  }, [title]);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md min-h-[300px]">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      {tasks.map((task) => (
        <TaskCard key={task.id} title={task.title} taskId={task.id} status={title} />
      ))}
    </div>
  );
};

export default TaskColumn;
