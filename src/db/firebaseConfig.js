import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyByPfjCC3noFj1XBMrM95RGJ5tCI_PlzTQ",
//   authDomain: "appnotas-c6bd4.firebaseapp.com",
//   projectId: "appnotas-c6bd4",
//   storageBucket: "appnotas-c6bd4.firebasestorage.app",
//   messagingSenderId: "1084866332025",
//   appId: "1:1084866332025:web:3c989efe08d6bbff255ba8"
// };
const firebaseConfig = {

  apiKey: import.meta.env.VITE_API_KEY,

  authDomain: import.meta.env.VITE_AUTH_DOMAIN,

  projectId: import.meta.env.VITE_PROJECT_ID,

  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,

  messagingSenderId: import.meta.env.VITE_MESSAGIN_SENDER_ID,

  appId: import.meta.env.VITE_APP_ID

};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
