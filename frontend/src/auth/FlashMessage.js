import React, { useContext } from 'react';
import { SessionContext } from "./AppProvider";

const FlashMessage = () => {
  const { message, clearMessage } = useContext(SessionContext);
  if (message) {
    return <small className="flash-message" >
      {message}
      <button type="button" onClick={clearMessage} >
        Ok
      </button >
    </small >
  } else {
    return null
  }
};

export default FlashMessage;
