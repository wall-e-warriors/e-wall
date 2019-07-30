import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Box, Container } from '@material-ui/core';
import Widget from './Widget';
import Header from './Header';
import Milestone from './widgets/milestone';
import CreateTimeOff from "./widgets/timeOff/CreateTimeOff";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Header />
        <Box marginTop={2}>
          <Container maxWidth="xl">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                <Widget title="Milestones" render={Milestone} />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                <Widget title="TimeOff" render={CreateTimeOff} />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </div>
    );
  }
}

export default Dashboard;
