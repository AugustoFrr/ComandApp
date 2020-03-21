import * as firebaseApp from "firebase/app";
import "firebase/database";
import "firebase/auth";
var firebaseConfig = {
    apiKey: "AIzaSyDUSLLeqjEyR2Ez8Iv2Ta_0yhE1JSKWRR8",
    authDomain: "comandapp-13714.firebaseapp.com",
    databaseURL: "https://comandapp-13714.firebaseio.com",
    projectId: "comandapp-13714",
    storageBucket: "comandapp-13714.appspot.com",
    messagingSenderId: "709124723428",
    appId: "1:709124723428:web:2c8157039db99febd592f1"

};

firebaseApp.initializeApp(firebaseConfig);

export default firebaseApp;