import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import './App.css';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import NoteList from './NoteList/NoteList';
import NoteDetail from './NoteDetail/NoteDetail';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: this.props.folders,
      notes: this.props.notes
    }
  }

  findNote = 

  render() {
    const { notes, folders } = this.state;
    return (
      <div className="App">
        <Sidebar />
        <Header />
        <main>
        <Switch>
          <Route path="/note/:noteId" render={routeProps => {
            const { noteId } = routeProps.match.params;
            const note = findNote(notes, noteId);
            return <NoteDetail {...routeProps} note={note} />;
          }}/>
        </Switch>
        </main>
      </div>
    );
  }
}

export default App;
