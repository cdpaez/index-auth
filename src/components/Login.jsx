import { useState } from "react";
import { auth } from "../db/firebaseConfig";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import '../components/Login.css'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      alert("Inicio de sesión exitoso");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    alert("Sesión cerrada");
  };

  return (
    <div className="login-container">
      {user ? (
        <div>
          <h2>Bienvenido, {user.email}</h2>
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      ) : (
        <form onSubmit={handleLogin} className="login-form">
          <h2>Iniciar Sesión</h2>
          <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Ingresar</button>
        </form>
      )}
    </div>
  );
};

export default Login;
