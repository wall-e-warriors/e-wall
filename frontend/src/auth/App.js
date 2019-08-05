import React, { Fragment, useContext } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { SessionContext } from './AppProvider';
import Login from './Login';

import Navbar from './Navbar';
import FlashMessage from './FlashMessage';

function App() {
  const { user } = useContext(SessionContext);

  return (
    <Router >
      <Fragment >
        <Navbar />
        <FlashMessage />
        <Route
          exact
          path="/"
          component={() => <h1 className="content" >Welcome, Home!</h1 >}
        />
        <Route exact path="/login" component={() => <Login />} />
        <Route
          exact
          path="/dashboard"
          component={() => (
            user ? (
              <h1 className="content" >Protected dashboard!</h1 >
            ) : (
              <div className="content" >
                <h1 >Access denied.</h1 >
                <p >You are not authorized to access this page.</p >
              </div >
            )
          )}
        />
        <Route
          exact
          path="/signedOut"
          component={() => (
            <h1 className="content" >You're now signed out.</h1 >
          )}
        />
      </Fragment >
    </Router >
  );
}

export default App;
