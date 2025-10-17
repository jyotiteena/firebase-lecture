// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwcYb0MkZVdz4edCuunjXBNggaQA2yCq8",
  authDomain: "firestore-db-40bba.firebaseapp.com",
  projectId: "firestore-db-40bba",
  storageBucket: "firestore-db-40bba.firebasestorage.app",
  messagingSenderId: "510737090641",
  appId: "1:510737090641:web:f926a2ecd9a36929d99070"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)
export {db,auth}
// export default db
