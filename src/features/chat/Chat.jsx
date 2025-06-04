import React, { useState, useEffect, useRef } from 'react';
import { db, auth } from '../../services/firebaseConfig';  // Asegúrate que tengas auth y db configurado
import {
  collection,
  addDoc,
  query,
  orderBy,
  serverTimestamp,
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
  increment
} from 'firebase/firestore';
import './chat.css'

const Chat = () => {
  // declaracion de variables 
  const [mensajes, setMensajes] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const scrollRef = useRef();

  useEffect(() => {
    const q = query(collection(db, 'chats'), orderBy('createdAt'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const mensajesFirestore = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMensajes(mensajesFirestore);
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    });

    return () => unsubscribe();
  }, []);

  const enviarMensaje = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) return;

    const { uid, displayName } = user;

    if (nuevoMensaje.trim() === '') return;

    try {
      const userRef = doc(db, 'usuarios', uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        alert("⚠️ No se encontró el documento del usuario.");
        return;
      }

      const { totalMensajes = 0 } = userSnap.data();

      if (totalMensajes >= 30) {
        alert("🚫 Has alcanzado el límite de 30 mensajes permitidos.");
        return;
      }

      await addDoc(collection(db, 'chats'), {
        text: nuevoMensaje,
        createdAt: serverTimestamp(),
        uid,
        displayName
      });

      await updateDoc(userRef, {
        totalMensajes: increment(1)
      });

      setNuevoMensaje('');
    } catch (error) {
      console.error("❌ Error al enviar el mensaje:", error);
    }
  };


  return (
    <div className="chat-container">
      <h1>CHAT GENERAL</h1>
      <div className="mensajes">
        {mensajes.map(msg => (
          <div
            key={msg.id}
            className={`mensaje ${msg.uid === auth.currentUser.uid ? 'propio' : 'otro'}`}
          >
            <strong>{msg.displayName}</strong>
            <p>{msg.text}</p>
          </div>
        ))}
        <span ref={scrollRef}></span>
      </div>
      <form onSubmit={enviarMensaje} className="formulario-chat">
        <input
          type="text"
          placeholder="Escribe tu mensaje..."
          value={nuevoMensaje}
          onChange={(e) => setNuevoMensaje(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Chat;
