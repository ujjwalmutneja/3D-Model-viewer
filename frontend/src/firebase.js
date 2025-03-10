// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDf99QeYhvzs-Bq1Brho69IGWuKLCZ2g5g",
  authDomain: "project-9915a.firebaseapp.com",
  projectId: "project-9915a",
  storageBucket: "project-9915a.appspot.com",  // Fix: Correct Firebase Storage URL
  messagingSenderId: "382170700321",
  appId: "1:382170700321:web:00ce34058cf3c95a8fa160"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;  // Fix: Export the initialized Firebase app
