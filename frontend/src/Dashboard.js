import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Widget from './ui/Widget';
import Milestone from './widgets/milestone';
import TimeOff from './widgets/timeOff';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
            <Widget title="Milestones" render={Milestone} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={6} xl={6}>
            <Widget title="Chart" render={TimeOff} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
