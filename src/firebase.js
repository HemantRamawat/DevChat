import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCvQcCPmvd-0UYaBmbgUENaeGMulIathX8",
  authDomain: "devchat-f15ae.firebaseapp.com",
  projectId: "devchat-f15ae",
  storageBucket: "devchat-f15ae.firebasestorage.app",
  messagingSenderId: "820877090923",
  appId: "1:820877090923:web:f9e3d403a81301f459512e",
  databaseURL: 'https://devchat-f15ae-default-rtdb.firebaseio.com/',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const realtimeDb = getDatabase(app);

export { auth, provider, db, realtimeDb };
