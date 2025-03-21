import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyALZGIUfLADVCk3af77buLUTP1ESFAAaGs",
    authDomain: "capricorn-doctor.firebaseapp.com",
    projectId: "capricorn-doctor",
    storageBucket: "capricorn-doctor.firebasestorage.app",
    messagingSenderId: "25012265148",
    appId: "1:25012265148:web:2648742a71163aca2db0b9",
    measurementId: "G-2CXBR3Q63Y"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }

