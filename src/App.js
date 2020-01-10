import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import NoteList from './NoteList/NoteList';
import NoteDetail from './NoteDetail/NoteDetail';
import NoteContext from './NoteContext';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';
import ErrorBoundary from './ErrorBoundary';

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
    ]).then(([foldersRes, notesRes]) => {
      if (!foldersRes.ok)
        return foldersRes.json().then(e => Promise.reject(e));
      if (!notesRes.ok)
        return notesRes.json().then(e => Promise.reject(e));
      return Promise.all([foldersRes.json(), notesRes.json()]);
    }).then(([folders, notes]) => {
      this.setState({ folders, notes });
      // console.log(folders);
    })
      .catch(error => {
        console.error({ error });
      });
  }

  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  };

  handleAddFolder = folder => {
    this.setState({
      folders: [...this.state.folders, folder]
    })
  }

  handleAddNote = note => {
    this.setState({
      notes: [...this.state.notes, note]
    })
  }

  render() {
    const ContextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.handleDeleteNote,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote
    };
    // console.log(this.state.folders);
    return (
      <div className="App">
        <ErrorBoundary>
        <NoteContext.Provider value={ContextValue}>
          {['/', '/folder/:folderId','/AddFolder', '/AddNote'].map((path, idx) => (
            <Route exact path={path} key={idx} component={Sidebar} />
          ))}
          <Header />
          <main className='Main'>
            {['/', '/folder/:folderId'].map((path, idx) => (
              <Route exact path={path} key={idx} component={NoteList} />
            ))}
            <Route path="/note/:noteId" component={NoteDetail} />
            <Route path='/AddFolder' component={AddFolder} />
            <Route path='/AddNote' component={AddNote} />
          </main>
        </NoteContext.Provider>
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
