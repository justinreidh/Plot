// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdSYD6j8xMpHWTnMeG6J_yq8eYPhDGJfY",
  authDomain: "sampleforstripe.firebaseapp.com",
  projectId: "sampleforstripe",
  storageBucket: "sampleforstripe.firebasestorage.app",
  messagingSenderId: "646309753616",
  appId: "1:646309753616:web:4109b4a2fc3349c2682b95",
  measurementId: "G-0L4GD82R7Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };