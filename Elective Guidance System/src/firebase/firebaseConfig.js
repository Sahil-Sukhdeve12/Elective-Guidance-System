// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwNxGT2rlob-owOKymAF16VubefWaWGTo",
  authDomain: "elective-guidance-system-aff27.firebaseapp.com",
  projectId: "elective-guidance-system-aff27",
  storageBucket: "elective-guidance-system-aff27.appspot.com",
  messagingSenderId: "777997641466",
  appId: "1:777997641466:web:dac976938700ef4287cb43",
  measurementId: "G-HBWMPQCM41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth=getAuth(app);

export{app,auth};