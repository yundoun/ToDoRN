// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import 'firebase/auth'
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBi8NtIm1geEGEmGQsp_AVSDXu6r1ZgCDo",
  authDomain: "react-native-todo-d9f9e.firebaseapp.com",
  projectId: "react-native-todo-d9f9e",
  storageBucket: "react-native-todo-d9f9e.appspot.com",
  messagingSenderId: "74024778007",
  appId: "1:74024778007:web:c18e7c5aa839ccc3da1f52",
  measurementId: "G-2W6YKTVW1P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;