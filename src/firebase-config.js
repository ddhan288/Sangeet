
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {

    apiKey: "AIzaSyCIMXBk-ZiCNLHGG5r41gRtKyAgZ2E2nJE",

    authDomain: "music-player-2f797.firebaseapp.com",

    projectId: "music-player-2f797",

    storageBucket: "music-player-2f797.appspot.com",

    messagingSenderId: "199118807638",

    appId: "1:199118807638:web:8bc3dc9b7db33b292651f7"

};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;