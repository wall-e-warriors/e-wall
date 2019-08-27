import React, { Fragment, useContext } from 'react';
import { HashRouter as Router, Redirect, Route } from 'react-router-dom';

import { SessionContext } from './auth/AuthProvider';
import Login from './auth/Login';
import FlashMessage from './ui/FlashMessage';
import DashboardContainer from './DashboardContainer';
import Edit from './widgets/milestone/Edit';

function App() {
  const { isAuthenticated } = useContext(SessionContext);

  return (
    <Router>
      <Fragment>
        <FlashMessage />
        <Route
          exact
          path="/"
          component={() =>
            isAuthenticated() ? (
              <Redirect to={'/dashboard'} />
            ) : (
              <Redirect to={'/login'} />
            )
          }
        />
        <Route exact path="/login" component={Login} />
        <Route exact path="/dashboard" component={DashboardContainer} />
        <Route exact path="/edit" component={Edit} />
      </Fragment>
    </Router>
  );
}

export default App;
