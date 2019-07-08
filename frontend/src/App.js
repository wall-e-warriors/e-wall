import React, { Component } from 'react';
import StackGrid from 'react-stack-grid';
import Container from '@material-ui/core/Container';
import HealthCheck from './widgets/healthcheck';
import Header from './Header';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Container className="container" maxWidth="xl">
          <StackGrid>
            <HealthCheck />
          </StackGrid>
        </Container>
      </div>
    );
  }
}

export default App;
