import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCIVZSzEPLxOaHfMut2SHPE9HPxiLLwr3Y",
  authDomain: "ecommerce-app-d72d2.firebaseapp.com",
  projectId: "ecommerce-app-d72d2",
  storageBucket: "ecommerce-app-d72d2.appspot.com",
  messagingSenderId: "961904703045",
  appId: "1:961904703045:android:45c955f18459398a44552c",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
};

export { signInWithEmailAndPassword, createUserWithEmailAndPassword };



