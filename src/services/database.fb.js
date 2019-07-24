import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

// Maybe use firebase hooks but doesn't look too active
// also seems to not have great support
// https://github.com/CSFrequency/react-firebase-hooks

const config = {
    apiKey: "AIzaSyBvGmTBk9Krv1B_SNJ0fSFiaQAvlbt5u0k",
    authDomain: "leansheets-bdd35.firebaseapp.com",
    databaseURL: "https://leansheets-bdd35.firebaseio.com",
    projectId: "leansheets-bdd35",
    storageBucket: "leansheets-bdd35.appspot.com",
    messagingSenderId: "413055218973",
    appId: "1:413055218973:web:885e1df95a4cf56c"
  }
  
  firebase.initializeApp(config)
  
  export const db = firebase.firestore()
  
  export const auth = firebase.auth