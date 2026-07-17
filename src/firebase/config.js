import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2QyIrAd3yRGl1iYQ6-eqvAhoYMH629OM",
  authDomain: "matestore-coder.firebaseapp.com",
  projectId: "matestore-coder",
  storageBucket: "matestore-coder.firebasestorage.app",
  messagingSenderId: "748628287894",
  appId: "1:748628287894:web:5bc6f8537fc78daf7abdb7",
  measurementId: "G-F5GF87YMPP"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);