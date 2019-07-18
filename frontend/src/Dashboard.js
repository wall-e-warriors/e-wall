import React, { Component } from 'react';
import Widget from "./Widget";
import Grid from "@material-ui/core/Grid";

class Dashboard extends Component {
  render() {
    return (
      <div >
        <Grid container spacing={3} >
          <Grid item xs >
            <Widget />
          </Grid >
          <Grid item xs >
            <Widget />
          </Grid >
          <Grid item xs >
            <Widget />
          </Grid >
          <Grid item xs >
            <Widget />
          </Grid >
        </Grid >

      </div >
    );
  }
}

export default Dashboard;
