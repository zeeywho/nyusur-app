// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaoATacvmLT7Tj7j_lF4tPicNLhAp3XLM",
  authDomain: "nyusur-8e11b.firebaseapp.com",
  databaseURL: "https://nyusur-8e11b-default-rtdb.firebaseio.com",
  projectId: "nyusur-8e11b",
  storageBucket: "nyusur-8e11b.firebasestorage.app",
  messagingSenderId: "758050669315",
  appId: "1:758050669315:web:ceae0a0dacf9d457a25f36",
  measurementId: "G-GTSYYM61SG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth};
