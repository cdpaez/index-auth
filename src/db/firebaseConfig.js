import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyByPfjCC3noFj1XBMrM95RGJ5tCI_PlzTQ",
  authDomain: "appnotas-c6bd4.firebaseapp.com",
  projectId: "appnotas-c6bd4",
  storageBucket: "appnotas-c6bd4.firebasestorage.app",
  messagingSenderId: "1084866332025",
  appId: "1:1084866332025:web:3c989efe08d6bbff255ba8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
