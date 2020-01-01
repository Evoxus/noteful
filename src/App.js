import React from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <Link to='/'>Noteful</Link>
      </header>
      <main>
        <Route
          path='/'
          component={null}
        />
      </main>
    </div>
  );
}

export default App;
