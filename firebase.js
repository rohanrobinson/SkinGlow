// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALmbP917AgqLS93P29xPC-9alFS0Pfv5o",
  authDomain: "skin-glow-4af36.firebaseapp.com",
  projectId: "skin-glow-4af36",
  storageBucket: "skin-glow-4af36.firebasestorage.app",
  messagingSenderId: "848528479640",
  appId: "G-64K8LBVW1B",
};

// Initialize Firebase 
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// Initialize Firestore
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

console.log("Firestore initialized:", db);



export { db };