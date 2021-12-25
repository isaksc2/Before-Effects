import { initializeApp, firestore } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA4AwxO2aOxJPOGoGn-QI7gPehxF7X7jZg",
    authDomain: "beforefx.firebaseapp.com",
    projectId: "beforefx",
    storageBucket: "beforefx.appspot.com",
    messagingSenderId: "387930386610",
    appId: "1:387930386610:web:b333ff154530b29fd9d9ab",
    measurementId: "G-Z7X1PV5C9E"
  };

const firebase = initializeApp(firebaseConfig);
export const authentication = getAuth();
export const db = getFirestore(firebase);

//export default app;