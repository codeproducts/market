import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'


const firebaseConfig = {
    apiKey: "AIzaSyCG0dH2kE9vdcfVD5cL9Iarw8O-mVkS2m0",
    authDomain: "eshop-f1bd7.firebaseapp.com",
    projectId: "eshop-f1bd7",
    storageBucket: "eshop-f1bd7.appspot.com",
    messagingSenderId: "819221436843",
    appId: "1:819221436843:web:97d755e431469229b59aee",
    measurementId: "G-YNVZ9PS715"
  };

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const fs = firebase.firestore();
const storage = firebase.storage();

export {auth,fs,storage}