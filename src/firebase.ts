// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQi-ObMj7W43w--87Hzb6ofnalMW1VcjI",
  authDomain: "diagram-f5850.firebaseapp.com",
  projectId: "diagram-f5850",
  storageBucket: "diagram-f5850.appspot.com",
  messagingSenderId: "125451231300",
  appId: "1:125451231300:web:c7dd7327cf58ee873a5c11",
  measurementId: "G-BFNXGECLY0"
};

// Initialize Firebase
export default function initFirebase() {
  getAnalytics(initializeApp(firebaseConfig));
}
