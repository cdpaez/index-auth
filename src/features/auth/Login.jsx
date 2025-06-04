import './login.css'

import { useState } from "react";
import { auth } from "../../services/firebaseConfig";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import NoteApp from '../notes/NoteApp'
import Chat from '../chat/Chat'
import ResetPasswordForm from './ResetPassword';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

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
            <NoteApp />
            <Chat />
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
