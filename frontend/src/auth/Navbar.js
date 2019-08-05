import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { auth } from '../auth/firebase';
import { SessionContext } from "./AppProvider";

const Navbar = props => {
  const { user, destroySession } = useContext(SessionContext);
  const handleLogout = () => {
    auth.logout();
    destroySession();
    props.history.push('/signedOut');
  };

  return (
    user ? (
      <ul >
        <li >
          <Link to="/dashboard" >Dashboard</Link >
        </li >
        <li >
          <a onClick={handleLogout} >Logout</a >
        </li >
      </ul >
    ) : (
      <ul >
        <li >
          <Link to="/" >Home</Link >
        </li >
        <li >
          <Link to="/login" >Login</Link >
        </li >
        <li >
          <Link to="/signup" >Create Account</Link >
        </li >
      </ul >
    )
  );
};

export default withRouter(Navbar);
