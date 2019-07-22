import React, { Component } from 'react';
import Widget from "./Widget";
import Grid from "@material-ui/core/Grid";
import Header from "./Header";
import { Box, Container } from "@material-ui/core";

class Dashboard extends Component {
  render() {
    return (
      <div >
        <Header />
        <Box marginTop={2} >
          <Container maxWidth="xl" >
            <Grid container spacing={3} >
              <Grid item xs={12} sm={6} md={4} lg={3} xl={3} >
                <Widget title="Milestones" />
              </Grid >
              <Grid item xs={12} sm={6} md={4} lg={3} xl={3} >
                <Widget title="Leaves" />
              </Grid >
              <Grid item xs={12} sm={6} md={4} lg={3} xl={3} >
                <Widget title="Calendar"/>
              </Grid >
            </Grid >
          </Container >
        </Box >
      </div >
    );
  }
}

export default Dashboard;
