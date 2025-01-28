// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDBO05ViEGfgW8tnwXtwX3YSxq3jf8iCAg",
  authDomain: "sigonafoundation-c777e.firebaseapp.com",
  projectId: "sigonafoundation-c777e",
  storageBucket: "sigonafoundation-c777e.firebasestorage.app",
  messagingSenderId: "151748563736",
  appId: "1:151748563736:web:a6be36c8665a13e8c9c46d",
  measurementId: "G-MZC2875ECH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)

export {auth, db}