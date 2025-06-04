import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

export const registerUser = async (email, password) => {
  const auth = getAuth();
  try {
    // Registrar al usuario
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Enviar correo de verificación
    await sendEmailVerification(user);
    console.log("Correo de verificación enviado a:", email);

    return "Usuario registrado. Por favor, verifica tu correo electrónico.";
  } catch (error) {
    console.error("Error al registrar usuario:", error.message);
    return error.message;
  }
};