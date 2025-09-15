// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQ6Sj2xM62pjOPgto_y-dbfcWfYi2NacY",
  authDomain: "susubank.firebaseapp.com",
  projectId: "susubank",
  storageBucket: "susubank.firebasestorage.app",
  messagingSenderId: "190605046478",
  appId: "1:190605046478:web:9d631173e7e4dee6db169f"
}; 

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

