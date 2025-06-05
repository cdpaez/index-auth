import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useState } from 'react';
import { db } from '../../services/firebaseConfig';
import {
  collection, onSnapshot, query, where, deleteDoc, doc
} from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Calendar({ user, onOpenModal }) {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const eventosRef = collection(db, 'eventos');
    const q = query(eventosRef, where('uid', '==', user.uid));

    const unsub = onSnapshot(q, (snapshot) => {
      const eventos = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          date: data.date,
          backgroundColor: data.color || '#3788d8',
        };
      });
      setEventos(eventos);
    });

    return () => unsub();
  }, [user]);

  const handleDateClick = (info) => {
    onOpenModal({
      mode: 'create',
      date: info.dateStr,
    });
  };

  const handleEventClick = (clickInfo) => {
    const id = clickInfo.event.id;

    // Componente para el contenido del toast con botones
    const ToastActions = () => (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button
          onClick={() => {
            onOpenModal({
              mode: 'edit',
              data: {
                id: clickInfo.event.id,
                title: clickInfo.event.title,
                color: clickInfo.event.backgroundColor,
              },
            });
            toast.dismiss(); // cierra el toast
          }}
          style={{ marginRight: '10px' }}
        >
          Editar
        </button>

        <button
          onClick={async () => {
            const eventoRef = doc(db, 'eventos', id);
            await deleteDoc(eventoRef);
            toast.dismiss(); // cierra el toast
            toast.success('Evento eliminado');
          }}
        >
          Eliminar
        </button>
      </div>
    );

    // Mostrar el toast con los botones y sin cierre automático
    toast.info(<ToastActions />, { autoClose: false, closeOnClick: false });
  };
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={eventos}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        height="auto"
      />
      <ToastContainer position="top-center" />
    </div>

  );
}