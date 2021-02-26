import firebase from 'firebase';
import * as firebaseui from 'firebaseui'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBL2AUZRy6mi_m95GT4kV7L4fsT7Axg-Zo",
  authDomain: "cloudgile.firebaseapp.com",
  databaseURL: "https://cloudgile-default-rtdb.firebaseio.com",
  projectId: "cloudgile",
  storageBucket: "cloudgile.appspot.com",
  messagingSenderId: "629892471859",
  appId: "1:629892471859:web:4f732e31d708bcf9925746",
  measurementId: "G-9B4R9E9LTH"
};

 firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const authUI = new firebaseui.auth.AuthUI(auth);