import firebase from "firebase";
import ReduxSagaFirebase from "redux-saga-firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCBX9fk66Cxzavf8B84YW9oIJOAKM9M_jg",
  authDomain: "firechat-17ef5.firebaseapp.com",
  projectId: "firechat-17ef5",
  storageBucket: "firechat-17ef5.appspot.com",
  messagingSenderId: "707827751647",
  appId: "1:707827751647:web:ba3f7f99635c1778be676a"
});

export const db = firebaseApp.firestore();
export const auth = firebaseApp.auth();

export const rsf = new ReduxSagaFirebase(firebaseApp);
