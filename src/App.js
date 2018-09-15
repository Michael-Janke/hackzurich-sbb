import React, { Component } from 'react';
import train from './train.svg';
import './App.css';
import View1 from './View1';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={train} className="App-logo" alt="train" />
          <h1 className="App-title">Platform Simulator</h1>
        </header>
        <p className="App-intro">
          <View1 />
        </p>
      </div>
    );
  }
}

export default App;
