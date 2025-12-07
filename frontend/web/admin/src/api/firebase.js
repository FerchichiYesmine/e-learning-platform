// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDUgsbAlURd42qGEKHpphHS1BLXIPXVdBY",
  authDomain: "learntounsi-7d90b.firebaseapp.com",
  projectId: "learntounsi-7d90b",
  storageBucket: "learntounsi-7d90b.firebasestorage.app",
  messagingSenderId: "1020977954182",
  appId: "1:1020977954182:web:87de3995980a43d6b14007"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
