
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCRIPbcdpwB4Oi4KlUDa2rVGB5s4NsiJvg",
  authDomain: "sahyog-ngo-df760.firebaseapp.com",
  projectId: "sahyog-ngo-df760",
  storageBucket: "sahyog-ngo-df760.firebasestorage.app",
  messagingSenderId: "3875739453",
  appId: "1:3875739453:web:f0ef26197d9d85390b9754"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default { app, auth };