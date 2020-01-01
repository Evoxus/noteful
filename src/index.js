import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import STORE from './dummy-store';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <App folders={STORE.folders} notes={STORE.notes} />
  </BrowserRouter>, 
  document.getElementById('root'));
