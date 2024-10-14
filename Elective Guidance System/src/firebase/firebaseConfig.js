// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCwNxGT2rlob-owOKymAF16VubefWaWGTo",
//   authDomain: "elective-guidance-system-aff27.firebaseapp.com",
//   projectId: "elective-guidance-system-aff27",
//   storageBucket: "elective-guidance-system-aff27.appspot.com",
//   messagingSenderId: "777997641466",
//   appId: "1:777997641466:web:dac976938700ef4287cb43",
//   measurementId: "G-HBWMPQCM41"
// };

const firebaseConfig = {
  apiKey: "AIzaSyAhEUhEtT8Cs70L4D6BShGHWssBYYMOds0",
  authDomain: "elective-guidance-system-38393.firebaseapp.com",
  projectId: "elective-guidance-system-38393",
  storageBucket: "elective-guidance-system-38393.appspot.com",
  messagingSenderId: "695327091436",
  appId: "1:695327091436:web:59a45f00ce53e6124193c9",
  measurementId: "G-HD8C31WQ5Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth=getAuth(app);

// initilalize firestore
const db= getFirestore(app);

export{app,auth,db};