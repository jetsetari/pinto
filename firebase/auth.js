import { auth } from "./firebase";
import { db } from "../firebase";
import Firebase from "firebase";

// Sign Up
export const doCreateUserWithEmailAndPassword = (email, password, callback) =>
  auth.createUserWithEmailAndPassword(email, password)
  .then((result) => {
    if (callback) callback()
  })
  .catch((error) => {
    let errorCode = error.code;
    let errorMessage = error.message;
    if (errorCode == "auth/weak-password") {
      if (callback) callback("Weak Password!");
    } else {
      if (callback) callback(errorMessage);
    }
  });

// Sign In
export function doSignInWithEmailAndPassword(email, password, callback) {
  auth
    .signInWithEmailAndPassword(email, password)
    .then((result) => {
      if (callback) callback(result.user.uid);
    })
    .catch((error) => {
      console.error("login error", error);
      if (callback) callback("error", error);
    });
}

// Sign out
export const doSignOut = () => auth.signOut();

// Password Reset
export function doPasswordReset(email, callback) {
  auth
    .sendPasswordResetEmail(email)
    .then((result) => {
      if (callback) callback(result);
    })
    .catch((error) => {
      console.error("login error", error);
      if (callback) callback("error", error);
    });
}

// Password Change
export const doPasswordUpdate = (password) =>
  auth.currentUser.updatePassword(password);
