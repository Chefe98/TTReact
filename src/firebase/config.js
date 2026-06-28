// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCyan9yMAjREFneEPBY9qyF9zG59rAWuU",
  authDomain: "tt-react-bd.firebaseapp.com",
  projectId: "tt-react-bd",
  storageBucket: "tt-react-bd.firebasestorage.app",
  messagingSenderId: "302646074798",
  appId: "1:302646074798:web:441b1231910bf0ee0c7c3f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

export { db , auth }