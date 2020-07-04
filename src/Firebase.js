import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyCtPHyoUxVtDx1zMLrLisCFbaPqgJ7Dc7U",
  authDomain: "react-spas-fa979.firebaseapp.com",
  databaseURL: "https://react-spas-fa979.firebaseio.com",
  projectId: "react-spas-fa979",
  storageBucket: "react-spas-fa979.appspot.com",
  messagingSenderId: "1039822188277",
  appId: "1:1039822188277:web:13bfbe251864be5855dfbc"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;

