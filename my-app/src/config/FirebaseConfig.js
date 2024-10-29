import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {



    apiKey: "AIzaSyBJBYcz7A9ZR106GcMMYMyI9-dpBISiS_c",
    authDomain: "coocking-app-3ae31.firebaseapp.com",
    projectId: "coocking-app-3ae31",
    storageBucket: "coocking-app-3ae31.appspot.com",
    messagingSenderId: "107289389593",
    appId: "1:107289389593:web:5d748253423662e2201888",
    measurementId: "G-EHNQ4JYSM9"
    
    
    
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;



