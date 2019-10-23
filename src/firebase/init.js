import firebase from "firebase";
import firestore from 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyA-993zgm0pDZOLA4AKHAa_jF5mSE_N6Ak",
  authDomain: "chat-d99a3.firebaseapp.com",
  databaseURL: "https://chat-d99a3.firebaseio.com",
  projectId: "chat-d99a3",
  storageBucket: "chat-d99a3.appspot.com",
  messagingSenderId: "651168654646",
  appId: "1:651168654646:web:adcb5491d9cbadac147f97",
  measurementId: "G-91WDD8SML6"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore();
