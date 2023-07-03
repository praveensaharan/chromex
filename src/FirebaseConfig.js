import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCTaykiNWOVc6jkJg-eo8W3Zvt35PCplxY",
  authDomain: "auth-42c91.firebaseapp.com",
  projectId: "auth-42c91",
  storageBucket: "auth-42c91.appspot.com",
  messagingSenderId: "788223772675",
  appId: "1:788223772675:web:24f0d6ec24419df7bce636",
  measurementId: "G-YLQC75GB6V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider, onAuthStateChanged };
