import React, { createContext, useEffect, useState } from "react";
import { firebase } from "./firebase";

const SessionContext = createContext({});

function AppProvider(props) {
  const [user, setUser] = useState(undefined);
  const [message, setMessage] = useState();

  let destroySession = () => setUser(undefined);
  let clearMessage = () => setMessage(undefined);

  useEffect(() => {
    firebase.auth.onAuthStateChanged(
      user => {
        return user && setUser(user)
      }
    );
  }, []);

  return (
    <SessionContext.Provider value={{
      user: user,
      setUser: setUser,
      message: message,
      setMessage: setMessage,
      destroySession: destroySession,
      clearMessage: clearMessage
    }} >
      {props.children}
    </SessionContext.Provider >
  );
}

export {
  SessionContext,
  AppProvider
}