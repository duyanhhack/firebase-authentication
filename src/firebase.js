// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBO1Qfz_k2EwdbYgRYVbwtP545FzkXiwrg",
    authDomain: "test-auth-b3840.firebaseapp.com",
    projectId: "test-auth-b3840",
    storageBucket: "test-auth-b3840.appspot.com",
    messagingSenderId: "26127419249",
    appId: "1:26127419249:web:a39e7982c393b8cadf18d0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app)