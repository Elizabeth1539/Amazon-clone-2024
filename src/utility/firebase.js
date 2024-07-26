// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlFOIV5NVBfkQkVztskl6JfBvBYT5-hsc",
  authDomain: "clone-e31f4.firebaseapp.com",
  projectId: "clone-e31f4",
  storageBucket: "clone-e31f4.appspot.com",
  messagingSenderId: "760393897750",
  appId: "1:760393897750:web:e46f31edbfa8c556d32237",
};


const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();
