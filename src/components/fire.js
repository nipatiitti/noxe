import firebase from 'firebase'
var config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
  apiKey: "AIzaSyC27I-qK-AmvRFYVtXLtYlbKAGr6_F5iW4",
    authDomain: "noxe-54e26.firebaseapp.com",
    databaseURL: "https://noxe-54e26.firebaseio.com",
    projectId: "noxe-54e26",
    storageBucket: "noxe-54e26.appspot.com",
    messagingSenderId: "359481027015"
};
var fire = firebase.initializeApp(config);
export default fire;
