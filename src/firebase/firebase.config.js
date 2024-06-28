// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPW1G1FAMSX0Thh4NJdqMkfHtGomqgPS8",
  authDomain: "user-email-password-auth-75b1c.firebaseapp.com",
  projectId: "user-email-password-auth-75b1c",
  storageBucket: "user-email-password-auth-75b1c.appspot.com",
  messagingSenderId: "1084505127011",
  appId: "1:1084505127011:web:1d3737b9b59d7ec2682056"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth