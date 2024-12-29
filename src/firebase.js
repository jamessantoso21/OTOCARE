import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB1LC5E9SeqOetS44JwSFM02Pj3uSxEdmM",
    authDomain: "otocare-b16fa.firebaseapp.com",
    projectId: "otocare-b16fa",
    storageBucket: "otocare-b16fa.appspot.com",
    messagingSenderId: "124104424279",
    appId: "1:124104424279:web:16aac8908ad77f83045c12"
  };

  const app = initializeApp(firebaseConfig);
  export const db= getFirestore(app);
  export const auth = getAuth()