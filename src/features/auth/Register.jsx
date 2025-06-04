import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../../services/firebaseConfig";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import './register.css'

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Registrar al usuario
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Crear documento del usuario con contadores en 0
      await setDoc(doc(db, "usuarios", user.uid), {
        totalNotas: 0,
        totalMensajes: 0
      });

      // Enviar correo de verificación
      await sendEmailVerification(user);
      alert("Usuario registrado con éxito. Por favor, verifica tu correo electrónico.");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="register-container">
      <h2>Registro</h2>
      <form onSubmit={handleRegister} className="register-form">
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Registrarse</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
