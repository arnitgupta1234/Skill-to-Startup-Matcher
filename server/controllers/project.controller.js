import { db } from '../config/firebase.js';
import { collection, addDoc, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';

export const createTask = async (req, res) => {
  const { title, status, userId } = req.body;

  try {
    const docRef = await addDoc(collection(db, "tasks"), { title, status, userId });
    res.status(201).json({ id: docRef.id, title, status, userId });
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error: error.message });
  }
};

export const getTasks = async (req, res) => {
  const { userId } = req.params;

  try {
    const q = query(collection(db, "tasks"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const tasks = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error: error.message });
  }
};

export const updateTaskStatus = async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;

  try {
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, { status });
    res.status(200).json({ message: "Task status updated" });
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error: error.message });
  }
};
