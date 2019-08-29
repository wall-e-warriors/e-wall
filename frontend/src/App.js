import React, { Fragment, useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { Box, Container } from '@material-ui/core';
import { SessionContext } from './auth/AuthProvider';
import Login from './auth/Login';
import FlashMessage from './ui/FlashMessage';
import DashboardContainer from './DashboardContainer';
import CreateUpdateDelete from './widgets/milestone/CreateUpdateDelete';
import Header from './Header';

function App() {
  const { isAuthenticated } = useContext(SessionContext);

  return (
    <Fragment>
      <Header />
      <Box marginTop={2}>
        <Container maxWidth="xl">
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
            <Route exact path="/edit" component={CreateUpdateDelete} />
          </Fragment>
        </Container>
      </Box>
    </Fragment>
  );
}

export default App;
