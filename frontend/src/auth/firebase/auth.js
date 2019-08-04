import { auth } from './firebase';

const userSession = (email, password) =>
  auth[`signInWithEmailAndPassword`](email, password);

/**
 * Destroy current user session
 */
const logout = () => auth.signOut();

export { userSession, logout };
