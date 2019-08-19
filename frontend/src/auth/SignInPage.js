import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { faUserNinja } from '@fortawesome/free-solid-svg-icons';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as PropTypes from 'prop-types';
import styles from './SignInPage.module.css';

export default function SignInPage({ onLogIn }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={styles.paper}>
        <Avatar className={styles.avatar}>
          <FontAwesomeIcon icon={faUserNinja} color="white" />
        </Avatar>
        <Typography component="h1" variant="h6">
          Login to eWall
        </Typography>
        <form
          className={styles.form}
          onSubmit={event => onLogIn(username, password, event)}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoFocus
            onChange={e => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={e => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={styles.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}

SignInPage.propTypes = {
  onLogIn: PropTypes.func.isRequired,
};
