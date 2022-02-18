import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyDG7t5K49AI_V59H3UZFu_FNZUdzM501-E",
  authDomain: "blogweb-8f77b.firebaseapp.com",
  projectId: "blogweb-8f77b",
  storageBucket: "blogweb-8f77b.appspot.com",
  messagingSenderId: "550654497651",
  appId: "1:550654497651:web:09d5e39e23e47ff6adab06"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth};
