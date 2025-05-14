// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyctSUEA6_hiLRUUTIbn-PPveDvnGqnQM",
  authDomain: "sleeptracker-2d71e.firebaseapp.com",
  projectId: "sleeptracker-2d71e",
  storageBucket: "sleeptracker-2d71e.firebasestorage.app",
  messagingSenderId: "474286015653",
  appId: "1:474286015653:web:d476debee56c8d88c0394c",
  measurementId: "G-P8N2YLR2CK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)

export {app, auth};