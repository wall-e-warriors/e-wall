import React, { Component } from "react";
import StackGrid from "react-stack-grid";
import './App.css';

class App extends Component {
  render() {
    return (
        <div className="App">
          <StackGrid className = "stack-grid" columnWidth={300}>
            <div>Component 1</div>
            <div>Component 2</div>
            <div>Component 3</div>
          </StackGrid>
        </div>
    );
  }
}

export default App;
