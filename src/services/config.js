// Importo las funciones necesarias de Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

// Mi configuración de Firebase
const firebaseConfig = {
  //variables locales
  // apiKey: "AIzaSyC9mSVmcbb6aliKlWOWFLKf95GywB5gQyQ",
  // authDomain: "e-commers-2a806.firebaseapp.com",
  // projectId: "e-commers-2a806",
  // storageBucket: "e-commers-2a806.firebasestorage.app",
  // messagingSenderId: "1011817694451",
  // appId: "1:1011817694451:web:ea8ec51cd6bc1e1a5ea386",

  //variables de entorno invocadas desde .env
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,


};

console.log(import.meta.env.VITE_FIREBASE_KEY)

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Exporto servicios que usaré
export const auth = getAuth(app);
export const db = getFirestore(app);




