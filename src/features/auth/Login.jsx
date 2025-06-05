import './login.css'

import { useState } from "react";
import { auth, db } from "../../services/firebaseConfig";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import NoteApp from '../notes/NoteApp'
import Chat from '../chat/Chat'
import Calendar from '../calendar/Calendar'
import EventModal from '../../components/CalendarModals';
import ResetPasswordForm from './ResetPassword';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import {
  collection,
  addDoc,
  updateDoc,
  doc
} from "firebase/firestore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null); // { mode: 'create' | 'edit', data, date }


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      console.log("Sesión iniciada");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    console.log('sesion cerrada')
  };

  return (
    <div className="login-container">

      {user ? (
        <div className='user-container'>
          <div className='header'>
            <h2>{user.email}</h2>
            <button onClick={handleLogout}>
              <FontAwesomeIcon icon={faArrowRightFromBracket} bounce style={{ color: "#FFFFFF" }} />
            </button>
          </div>
          <div className="panel__container">
            <div className="left-panel">
              <Calendar
                user={user}
                onOpenModal={(data) => {
                  setModalData(data); // { mode: 'create' | 'edit', data, date }
                  setModalOpen(true);
                }}
              />
            </div>
            <div className="right-panel">
              <div className="chat-panel">
                <Chat />
              </div>
              <div className="calendar-panel">
                <NoteApp />


              </div>
            </div>

            {modalOpen && (
              <EventModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                initialData={modalData}
                onSave={async ({ title, color }) => {
                  const eventosRef = collection(db, 'eventos');

                  if (modalData?.mode === 'edit') {
                    const eventoRef = doc(db, 'eventos', modalData.data.id);
                    await updateDoc(eventoRef, { title, color });
                  } else {
                    await addDoc(eventosRef, {
                      uid: user.uid,
                      title,
                      date: modalData.date,
                      color,
                    });
                  }
                }}
              />
            )}
          </div>

        </div>
      ) : (
        <div className='login-subcontainer'>
          <form onSubmit={handleLogin} className="login-form">
            <h2>Iniciar Sesión</h2>
            <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Ingresar</button>
          </form>
          <ResetPasswordForm />
        </div>
      )}

    </div>
  );
};

export default Login;
