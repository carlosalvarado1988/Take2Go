import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const loginRequest = (auth, email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const registerRequest = (auth, email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const requestLogOut = (auth) => signOut(auth);
