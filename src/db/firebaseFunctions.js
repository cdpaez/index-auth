import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc, query, where, getDoc } from "firebase/firestore";
import { db, auth } from "./firebaseConfig";


export const addNote = async (title, content) => {

  const user = auth.currentUser

  if (!user) {
    console.error('No se ha encontrado un usuario autenticado')
    return
  }
  try {
    const docRef = await addDoc(collection(db, "notas"), {
      title,
      content,
      createdAt: new Date(),
      userId: user.uid
    });

    return docRef.id;
  } catch (error) {
    console.error("Error al agregar nota:", error);
  }
};

export const getNotes = async () => {

  const user = auth.currentUser
  if (!user) {
    console.error('No se ha encontrado un usuario autenticado')
    return []
  }
  try {
    // Filtramos las notas para que solo el usuario autenticado vea sus propias notas
    const q = query(collection(db, "notas"), where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error al obtener las notas:", error);
    return [];
  }
};

export const deleteNote = async (id) => {

  const user = auth.currentUser;

  if (!user) {
    console.error("No se ha encontrado un usuario autenticado.");
    return;
  }
  try {
    const noteRef = doc(db, "notas", id);
    const noteSnapshot = await getDoc(noteRef);

    if (noteSnapshot.exists() && noteSnapshot.data().userId === user.uid) {
      await deleteDoc(noteRef);
      console.log("Nota eliminada:", id);
    } else {
      console.error("No tienes permiso para eliminar esta nota.");
    }
  } catch (error) {
    console.error("Error al eliminar nota:", error);
  }
};
export const updateNote = async (id, updatedFields) => {
  const user = auth.currentUser;

  if (!user) {
    console.error("No se ha encontrado un usuario autenticado.");
    return;
  }

  try {
    const noteRef = doc(db, "notas", id); // Referencia al documento específico
    const noteSnapshot = await getDoc(noteRef); // Obtener los datos actuales de la nota

    // Verificar que la nota existe y pertenece al usuario autenticado
    if (noteSnapshot.exists() && noteSnapshot.data().userId === user.uid) {
      await updateDoc(noteRef, updatedFields); // Actualizar los campos especificados
      console.log("Nota actualizada:", id);
    } else {
      console.error("No tienes permiso para actualizar esta nota.");
    }
  } catch (error) {
    console.error("Error al actualizar la nota:", error);
  }
};