import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import { SessionContext } from './AuthProvider';
import * as authSession from './firebase';
import SignInPage from './SignInPage';

const Login = props => {
  const { setMessage } = useContext(SessionContext);

  function handleErrors(reason) {
    setMessage(`Login failed: ${reason}`);
  }

  function handleSuccess() {
    props.history.push('/dashboard');
  }

  function handleSubmit(username, password, event) {
    event.preventDefault();
    authSession
      .userSession(username, password)
      .then(handleSuccess)
      .catch(handleErrors);
  }

  return <SignInPage title="Login" onLogIn={handleSubmit} />;
};
Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};
export default withRouter(Login);
