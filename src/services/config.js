// Importo las funciones necesarias de Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

// Mi configuración de Firebase
const firebaseConfig = {
  

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




