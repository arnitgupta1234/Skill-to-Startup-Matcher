// src/services/boardService.js
import { db } from "../firebase";
import { doc, onSnapshot, updateDoc, setDoc } from "firebase/firestore";

export const subscribeToBoard = (projectId, callback) => {
  const projectRef = doc(db, "projects", projectId);
  return onSnapshot(projectRef, (docSnap) => {
    callback(docSnap.exists() ? docSnap.data().columns : null);
  });
};

export const updateBoardColumns = async (projectId, columns) => {
  const projectRef = doc(db, "projects", projectId);
  await updateDoc(projectRef, { columns });
};

export const initBoardIfNeeded = async (projectId) => {
  const projectRef = doc(db, "projects", projectId);
  await setDoc(projectRef, {
    columns: {
      todo: [],
      inprogress: [],
      done: [],
    },
  }, { merge: true });
};
