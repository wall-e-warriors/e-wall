import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { auth } from './firebase';
import SignIn from "./SignIn";

class Form extends Component {
  constructor(props) {
    super(props);

    this.email = createRef();
    this.password = createRef();
    this.handleSuccess = this.handleSuccess.bind(this);
    this.handleErrors = this.handleErrors.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSuccess() {
    this.resetForm();
    this.props.onSuccess && this.props.onSuccess();
  }

  handleErrors(reason) {
    this.props.onError && this.props.onError(reason);
  }

  handleSubmit(username, password) {
    const {
      props: { action },
    } = this;

    auth
      .userSession(action, username, password)
      .then(this.handleSuccess)
      .catch(this.handleErrors);
  }

  resetForm() {
    if (!this.email.current || !this.password.current) {
      return;
    }
    const { email, password } = Form.defaultProps;
    this.email.current.value = email;
    this.password.current.value = password;
  }

  render() {
    return (
      <SignIn onSubmit={(username, password) => this.handleSubmit(username, password)} />
    );
  }
}

Form.propTypes = {
  title: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
};

Form.defaultProps = {
  errors: '',
  email: '',
  password: '',
};

export default Form;
