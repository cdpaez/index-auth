import './resetPassword.css';

import React, { useState } from "react";
import { resetPassword } from "../../services/firebaseResetPassword";


const ResetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const response = await resetPassword(email);
    setMessage(response);
  };

  return (
    <div className="reset-password-form">
      <h2>Restablecer Contraseña</h2>
      <form onSubmit={handleResetPassword}>
        <input
          type="email"
          placeholder="Ingresa tu correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Enviar Correo de Restablecimiento</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPasswordForm;