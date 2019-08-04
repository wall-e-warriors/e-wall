import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { auth } from '../auth/firebase';
import { Consumer } from './AppProvider';

const Navbar = props => {
  const handleLogout = context => {
    auth.logout();
    context.destroySession();
    props.history.push('/signedOut');
  };

  return (
    <Consumer>
      {({ state, ...context }) =>
        state.currentUser ? (
          <ul>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <a onClick={() => handleLogout(context)}>Logout</a>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Create Account</Link>
            </li>
          </ul>
        )
      }
    </Consumer>
  );
};

export default withRouter(Navbar);
