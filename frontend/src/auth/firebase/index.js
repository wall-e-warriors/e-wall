import * as firebase from 'firebase';
import { firebaseConfig } from './config';

!firebase.apps.length && firebase.initializeApp(firebaseConfig);

const userSession = (email, password) =>
  auth[`signInWithEmailAndPassword`](email, password);

const auth = firebase.auth();

const logout = () => auth.signOut();

export { userSession, logout, auth };
