import { auth } from './firebase';

const userSession = (action, email, password) =>
  auth[`${action}WithEmailAndPassword`](email, password);

/**
 * Destroy current user session
 */
const logout = () => auth.signOut();

export { userSession, logout };
