import '../components/Login.css'

import { useState } from "react";
import { auth } from "../db/firebaseConfig";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import NoteApp from '../components/NoteApp'
import ResetPasswordForm from './ResetPassword';


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
          <h2>Bienvenido, {user.email}</h2>  <button onClick={handleLogout}>Cerrar Sesión</button>
          </div>
          <NoteApp />
        </div>
      ) : (
        <div>
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
