import firebase from "firebase/compat/app";
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FB_KEY,
  authDomain: "quasar-app-crm.firebaseapp.com",
  projectId: "quasar-app-crm",
  storageBucket: "quasar-app-crm.appspot.com",
  messagingSenderId: "528036530780",
  appId: "1:528036530780:web:b1208fdc362db990107499",
};

firebase.initializeApp(firebaseConfig);

firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};

export default firebase;
