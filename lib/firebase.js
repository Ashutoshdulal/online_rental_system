// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: "online-rental-system-a9d00.firebasestorage.app",
  messagingSenderId: "367065719203",
  appId: "1:367065719203:web:6f659bf03f82d0fa98fa16",
  measurementId: "G-LNE2JL9X4W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);