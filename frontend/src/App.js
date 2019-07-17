import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Milestone from './widgets/milestone';
import Header from './Header';
import styles from './App.module.css';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Container className={styles.container} maxWidth="xl">
           <Milestone />
        </Container>
      </div>
    );
  }
}

export default App;
