import React, { createContext, useEffect, useState } from 'react';
import * as PropTypes from 'prop-types';
import * as firebaseAuth from './firebase';

const SessionContext = createContext({});
const AuthStatus = {
  CHECKING: 'Checking',
  SUCCESS: 'Success',
  FAILURE: 'Failure',
};

function AuthProvider(props) {
  const [user, setUser] = useState(undefined);
  const [authStatus, setAuthStatus] = useState(AuthStatus.CHECKING);
  const [message, setMessage] = useState();

  let destroySession = () => {
    firebaseAuth.logout().then(() => setUser(undefined));
  };

  let clearMessage = () => setMessage(undefined);

  let isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

  let isAuthenticated = () => {
    return isDev
      ? true
      : authStatus === AuthStatus.SUCCESS && user !== undefined;
  };

  useEffect(() => {
    firebaseAuth.auth.onAuthStateChanged(user => {
      if (user) {
        setAuthStatus(AuthStatus.SUCCESS);
        setUser(user);
      } else if (isDev) {
        setAuthStatus(AuthStatus.SUCCESS);
      } else {
        setAuthStatus(AuthStatus.FAILURE);
      }
    });
  }, [isDev]);

  return (
    <SessionContext.Provider
      value={{
        message: message,
        setMessage: setMessage,
        destroySession: destroySession,
        clearMessage: clearMessage,
        isAuthenticated: isAuthenticated,
        authStatus: authStatus,
      }}
    >
      {props.children}
    </SessionContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.func.isRequired,
};

export { SessionContext, AuthProvider, AuthStatus };
