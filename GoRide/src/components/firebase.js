// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDHbTi-SYk_Wqw7Q51d58qFkuQ7qEhF84E",
  authDomain: "coride-623aa.firebaseapp.com",
  projectId: "coride-623aa",
  storageBucket: "coride-623aa.firebasestorage.app",
  messagingSenderId: "384589858306",
  appId: "1:384589858306:web:ff6b6cd97b05207801c91b",
  measurementId: "G-F5L2920G4B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
