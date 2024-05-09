// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRsDe7sftWhKDbh0WsS1awHlUnh3-Vd84",
  authDomain: "blogging-71626.firebaseapp.com",
  projectId: "blogging-71626",
  storageBucket: "blogging-71626.appspot.com",
  messagingSenderId: "411977919617",
  appId: "1:411977919617:web:a6041be60eeba06c103180"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider()

const auth = getAuth()

export const authWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    return user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    return null;
  }
}
