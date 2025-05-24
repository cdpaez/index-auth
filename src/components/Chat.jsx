import React, { useState, useEffect, useRef } from 'react';
import { db, auth } from '../db/firebaseConfig';  // Asegúrate que tengas auth y db configurado
import {
  collection,
  addDoc,
  query,
  orderBy,
  serverTimestamp,
  onSnapshot
} from 'firebase/firestore';
import './chat.css'

const Chat = () => {
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
    const { uid, displayName } = auth.currentUser;

    if (nuevoMensaje.trim() === '') return;

    await addDoc(collection(db, 'chats'), {
      text: nuevoMensaje,
      createdAt: serverTimestamp(),
      uid,
      displayName
    });

    setNuevoMensaje('');
  };

  return (
    <div className="chat-container">
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
