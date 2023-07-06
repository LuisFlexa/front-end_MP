import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDyPjZTdU_o1_OFXVjNQR6yQp-Pxi347bk",
  authDomain: "mptrabalho-3ab33.firebaseapp.com",
  projectId: "mptrabalho-3ab33",
  storageBucket: "mptrabalho-3ab33.appspot.com",
  messagingSenderId: "156052039075",
  appId: "1:156052039075:web:1aafbb07d8e03d3b47a616",
  measurementId: "G-5JYY6G1NBD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const databaseApp = getFirestore(app);
