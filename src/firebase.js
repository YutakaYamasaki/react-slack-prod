import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyD5yu7dO1qTsW_7EkIrvt6qzVoE5IfMUdU",
    authDomain: "react-slack-prod.firebaseapp.com",
    databaseURL: "https://react-slack-prod.firebaseio.com",
    projectId: "react-slack-prod",
    storageBucket: "react-slack-prod.appspot.com",
    messagingSenderId: "498935583941",
    appId: "1:498935583941:web:90848dea1952335a724cac"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase;