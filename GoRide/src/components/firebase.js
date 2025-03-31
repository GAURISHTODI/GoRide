// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBzZBxiJ4Sl0U2x5r-vz_GkvLFSHCxV9zA",
  authDomain: "GoRide-f5117.firebaseapp.com",
  projectId: "GoRide-f5117",
  storageBucket: "GoRide-f5117.firebasestorage.app",
  messagingSenderId: "6788873029",
  appId: "1:6788873029:web:271f1bfce7b0ac235adc2c",
  measurementId: "G-V6F0PJXM4Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
