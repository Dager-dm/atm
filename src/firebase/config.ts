import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Tu configuración de Firebase (reemplaza con tus propias credenciales)
const firebaseConfig = {
  apiKey: "AIzaSyB2RhPcTmu5pqrbTxOl09Q_5PavWBBgpXM",
  authDomain: "atmsi-8b214.firebaseapp.com",
  projectId: "atmsi-8b214",
  storageBucket: "atmsi-8b214.firebasestorage.app",
  messagingSenderId: "706158539850",
  appId: "1:706158539850:web:1bb8518c6dfc7de53922b3",
  measurementId: "G-NCM4ZG9YG6"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios de Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
