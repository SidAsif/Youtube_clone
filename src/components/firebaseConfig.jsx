// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUVCLgyszAfIy1JCiZ4LIG7AtJmP-w_1c",
  authDomain: "fir-3f985.firebaseapp.com",
  projectId: "fir-3f985",
  storageBucket: "fir-3f985.appspot.com",
  messagingSenderId: "170386324934",
  appId: "1:170386324934:web:9100b973fd7c523ae246c7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export { signInWithPopup, onAuthStateChanged };
