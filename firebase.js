import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Import đúng hàm
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAbJYGCOox5S65AUerY8tCawpEzt9ZfdrA",
    authDomain: "qlnd-337b1.firebaseapp.com",
    projectId: "qlnd-337b1",
    storageBucket: "qlnd-337b1.appspot.com",
    messagingSenderId: "512968806168",
    appId: "1:512968806168:web:073d10b5ef032c3817d86d",
    measurementId: "G-T7HFKLHNSQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, signInWithEmailAndPassword, db }; // Export đúng hàm