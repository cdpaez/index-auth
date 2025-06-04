import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export const resetPassword = async (email) => {
  const auth = getAuth();
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Correo de restablecimiento enviado a:", email);
    return "Correo de restablecimiento enviado.";
  } catch (error) {
    console.error("Error al enviar el correo de restablecimiento:", error.message);
    return error.message;
  }
};