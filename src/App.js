import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import NoteList from './NoteList/NoteList';
import NoteDetail from './NoteDetail/NoteDetail';
import NoteContext from './NoteContext';

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
    const ContextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      getNotesForFolder: this.getNotesForFolder,
      findNote: this.findNote
    }
    return (
      <div className="App">
        <NoteContext.Provider value={ContextValue}>
          { ['/', '/folder/:folderId'].map((path, idx) => (
            <Route exact path={path} key={idx} component={Sidebar} />
          ))}
          <Header />
          <main className='Main'>
            {['/', '/folder/:folderId'].map((path, idx) => (
              <Route exact path={path} key={idx} component={NoteList} />
            ))}
            <Route path="/note/:noteId" component={NoteDetail} />
          </main>
        </NoteContext.Provider>
      </div>
    );
  }
}

export default App;
