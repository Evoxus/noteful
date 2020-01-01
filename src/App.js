import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = props.store;
  }

  render() {
    return (
      <div className="App">
        <nav className='sidebar'></nav>
        <header>
          <Link to='/'>Noteful</Link>
        </header>
        <main>
          
        </main>
      </div>
    );
  }
}

export default App;
