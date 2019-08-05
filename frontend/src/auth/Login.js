import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import Form from './Form';
import { SessionContext } from "./AppProvider";

const Login = props => {
  const { setMessage } = useContext(SessionContext);
  return (
    <Form
      title="Login"
      onSuccess={() => props.history.push('/dashboard')}
      onError={({ message }) =>
        setMessage(`Login failed: ${message}`)
      }
    />
  );
};

export default withRouter(Login);
