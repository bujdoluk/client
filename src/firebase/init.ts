/**
 * @file Firebase init config.
 */
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/performance';

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDKcwYnqL0qCdvHY45k5MHqCSJPn6r5GvY',
    appId: '1:399083903599:web:fa53e15e39466beda38b9a',
    authDomain: 'feedback-app-a6506.firebaseapp.com',
    messagingSenderId: '399083903599',
    projectId: 'feedback-app-a6506',
    storageBucket: 'feedback-app-a6506.appspot.com'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const perf = firebase.performance();

const { auth } = firebase;
const db = firebase.firestore();
const { storage } = firebase;
const increment = firebase.firestore.FieldValue.increment(1);
const decrement = firebase.firestore.FieldValue.increment(-1);
const timestamp = firebase.firestore.FieldValue.serverTimestamp();

export { auth, db, storage, increment, decrement, perf, timestamp, firebase };
