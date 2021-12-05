import * as firebase from "firebase/app"

const firebaseConfig = {
    apiKey: "AIzaSyCewTNIbyOSRcuOsLYqx55mv1HhnEdZVjI",
    authDomain: "quasar-app-crm.firebaseapp.com",
    projectId: "quasar-app-crm",
    storageBucket: "quasar-app-crm.appspot.com",
    messagingSenderId: "528036530780",
    appId: "1:528036530780:web:b1208fdc362db990107499"
  };
  firebase.initializeApp(firebaseConfig);

export default firebase