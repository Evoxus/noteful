import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import './App.css';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = props.store;
  }

  render() {
    return (
      <div className="App">
        <Sidebar />
        <Header />
        <main>
          
        </main>
      </div>
    );
  }
}

export default App;
