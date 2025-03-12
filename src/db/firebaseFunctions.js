import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const addNote = async (title, content) => {
  try {
    const docRef = await addDoc(collection(db, "notas"), {
      title,
      content,
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error al agregar nota:", error);
  }
};

export const getNotes = async () => {
  const querySnapshot = await getDocs(collection(db, "notas"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const deleteNote = async (id) => {
  await deleteDoc(doc(db, "notas", id));
  console.log("Nota eliminada:", id);
};