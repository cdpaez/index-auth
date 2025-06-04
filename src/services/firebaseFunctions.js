import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  query,
  where,
  getDoc,
  increment
} from "firebase/firestore";
import { db, auth } from "./firebaseConfig";

export const addNote = async (title, content) => {
  const user = auth.currentUser;

  if (!user) {
    console.error("No se ha encontrado un usuario autenticado");
    return;
  }

  try {
    const userRef = doc(db, "usuarios", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      console.error("Documento del usuario no existe");
      return;
    }

    const { totalNotas } = userSnap.data();

    if (totalNotas >= 10) {
      alert("🚫 Has alcanzado el límite de 10 notas permitidas.");
      return;
    }

    const docRef = await addDoc(collection(db, "notas"), {
      title,
      content,
      createdAt: new Date(),
      userId: user.uid
    });

    await updateDoc(userRef, {
      totalNotas: increment(1)
    });

    return docRef.id;
  } catch (error) {
    console.error("Error al agregar nota:", error);
  }
};

export const getNotes = async () => {
  const user = auth.currentUser;
  if (!user) {
    console.error("No se ha encontrado un usuario autenticado");
    return [];
  }
  try {
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

      // Decrementar contador
      const userRef = doc(db, "usuarios", user.uid);
      await updateDoc(userRef, {
        totalNotas: increment(-1)
      });
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
    const noteRef = doc(db, "notas", id);
    const noteSnapshot = await getDoc(noteRef);

    if (noteSnapshot.exists() && noteSnapshot.data().userId === user.uid) {
      await updateDoc(noteRef, updatedFields);
      console.log("Nota actualizada:", id);
    } else {
      console.error("No tienes permiso para actualizar esta nota.");
    }
  } catch (error) {
    console.error("Error al actualizar la nota:", error);
  }
};
