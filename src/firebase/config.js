import firebase from 'firebase';
import "firebase/firestore";
import 'firebase/auth';
import 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyDXlx40WKXhVWN5SrxXdAM7TMchnmyiXB4",
    authDomain: "fir-f4f69.firebaseapp.com",
    projectId: "fir-f4f69",
    storageBucket: "fir-f4f69.appspot.com",
    messagingSenderId: "196396594488",
    appId: "1:196396594488:web:591e869b8e0d11b6827dcd",
    measurementId: "G-S4MX9MR700"
};

export default firebase.initializeApp(firebaseConfig);