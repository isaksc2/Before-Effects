import { initializeApp, firestore } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCmUJDZXRwA_QNy4Gw0rC2qItpOvjWE3L0",
    authDomain: "before-effects-database.firebaseapp.com",
    projectId: "before-effects-database",
    storageBucket: "before-effects-database.appspot.com",
    messagingSenderId: "529587721955",
    appId: "1:529587721955:web:148dcf216d91ac885f97d6",
    measurementId: "G-2C3EBPF43Q"
};

const firebase = initializeApp(firebaseConfig);
export const authentication = getAuth;
export const db = getFirestore(firebase);

//export default app;