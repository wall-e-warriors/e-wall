import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import AppProvider, { Consumer } from './AppProvider';
import Login from './Login';

import Navbar from './Navbar';
import FlashMessage from './FlashMessage';

class App extends Component {
  render() {
    return (
      <AppProvider>
        <Router>
          <Fragment>
            <Navbar />
            <FlashMessage />
            <Route
              exact
              path="/"
              component={() => <h1 className="content">Welcome, Home!</h1>}
            />
            <Route exact path="/login" component={() => <Login />} />
            <Router
              exact
              path="/dashboard"
              component={() => (
                <Consumer>
                  {({ state }) =>
                    state.currentUser ? (
                      <h1 className="content">Protected dashboard!</h1>
                    ) : (
                      <div className="content">
                        <h1>Access denied.</h1>
                        <p>You are not authorized to access this page.</p>
                      </div>
                    )
                  }
                </Consumer>
              )}
            />
            <Route
              exact
              path="/signedOut"
              component={() => (
                <h1 className="content">You're now signed out.</h1>
              )}
            />
          </Fragment>
        </Router>
      </AppProvider>
    );
  }
}

export default App;
