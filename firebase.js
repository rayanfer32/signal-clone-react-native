import * as firebase from "firebase"
import "firebase/firestore"
import "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyD1QHWrTv0R3QANsfdJUzgaVAqzyqMVSUk",
    authDomain: "signal-clone-react-845f0.firebaseapp.com",
    projectId: "signal-clone-react-845f0",
    storageBucket: "signal-clone-react-845f0.appspot.com",
    messagingSenderId: "604688783176",
    appId: "1:604688783176:web:26d08b8b946032a139457d",
    measurementId: "G-6H5NBNZSGR"
};

let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };