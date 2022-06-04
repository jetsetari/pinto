import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/functions"

const prodConfig = {
  apiKey: "AIzaSyAF7FT8lS266Z_aMfVmwc1LencLYWh5Nrg",
  authDomain: "pinto-new-gen.firebaseapp.com",
  projectId: "pinto-new-gen",
  storageBucket: "pinto-new-gen.appspot.com",
  messagingSenderId: "874717882293",
  appId: "1:874717882293:web:32cbf4b73604d73fcd1bfc",
  measurementId: "G-LGRSZKLWHE"
};

const devConfig = {
  apiKey: "AIzaSyAF7FT8lS266Z_aMfVmwc1LencLYWh5Nrg",
  authDomain: "pinto-new-gen.firebaseapp.com",
  projectId: "pinto-new-gen",
  storageBucket: "pinto-new-gen.appspot.com",
  messagingSenderId: "874717882293",
  appId: "1:874717882293:web:32cbf4b73604d73fcd1bfc",
  measurementId: "G-LGRSZKLWHE"
};

const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config)
  // To enable analytics. https://firebase.google.com/docs/analytics/get-started
}

const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage();
const functions = firebase.functions();

export { db, auth, storage, functions };