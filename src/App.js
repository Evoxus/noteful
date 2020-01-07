import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import NoteList from './NoteList/NoteList';
import NoteDetail from './NoteDetail/NoteDetail';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: [],
      notes: []
    }
  }

  componentWillMount() {
    Promise.all([
      fetch('http://localhost:9090/folders', {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        },
      }),
      fetch('http://localhost:9090/notes', {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        },
      })
    ]).then(([notesRes, foldersRes]) => {
      if (!notesRes.ok)
        return notesRes.json().then(e => Promise.reject(e));
      if (!foldersRes.ok)
        return foldersRes.json().then(e => Promise.reject(e));
      return Promise.all([notesRes.json(), foldersRes.json()]);
    }).then(([notes, folders]) => {
        this.setState({ notes, folders });
      })
      .catch(error => {
        console.error({ error });
      });
  }

  findNote = (notes = [], noteId) =>
    notes.find(note => note.id === noteId)

  getNotesForFolder = (notes = [], folderId) => (
    (!folderId) ? notes : notes.filter(note => note.folderId === folderId)
  )

  render() {
    const { notes, folders } = this.state;
    return (
      <div className="App">
        {['/', '/folder/:folderId'].map((path, idx) => (
          <Route exact path={path} key={idx} render={routeProps => {
            return (
              <Sidebar {...routeProps} folders={folders} />
            );
          }} />
        ))}
        <Header />
        <main className='Main'>
          <Switch>
            {['/', '/folder/:folderId'].map((path, idx) => (
              <Route exact path={path} key={idx} render={routeProps => {
                const { folderId } = routeProps.match.params;
                const notesMatch = this.getNotesForFolder(
                  notes,
                  folderId
                );
                return (
                  <NoteList {...routeProps} notes={notesMatch} />
                );
              }} />
            ))}
            <Route path="/note/:noteId" render={routeProps => {
              const { noteId } = routeProps.match.params;
              const note = this.findNote(notes, noteId);
              return <NoteDetail {...routeProps} note={note} />;
            }} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
