import React, { Component } from 'react';
import NoteContext from '../NoteContext';
import './AddNote.css';

export default class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: '',
        touched: false
      },
      content: {
        value: '',
        touched: false
      },
      folder: {
        value: '',
        touched: false
      }
    }
  }

  static contextType = NoteContext;

  updateNoteName(value) {
    this.setState({
      name: {
        value: value,
        touched: true
      }
    });
  }
  updateNoteContent(value) {
    this.setState({
      content: {
        value: value,
        touched: true
      }
    });
  }

  updateNoteFolder(value) {
    this.setState({
      folder: {
        value: value,
        touched: false
      }
    })
  }

  getFolderId(folderName) {
    const folders = this.context.folders
    const result = folders.filter((folder) => folderName === folder.name)
    return result[0].id
  }

  handleSubmit(e) {
    const inputName = this.state.name.value;
    const inputContent = this.state.content.value;
    const inputFolderId = this.getFolderId(this.state.folder.value);
    const inputModified = new Date();
    const newNote = {
      name: inputName,
      content: inputContent,
      modified: inputModified,
      folderId: inputFolderId
    }
    e.preventDefault();
    fetch('http://localhost:9090/notes', {
      method: 'POST',
      body: JSON.stringify(newNote),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        this.context.addNote(data)
      })
    e.target.reset()
    this.props.history.push('/');
  }

  validateNewNote() {
    const noteName = this.state.name.value;
    const isNoteDuplicate = this.context.notes.filter(item => item.name === noteName).length > 0;
    if (noteName.length === 0) {
      return 'Name is required'
    } else if (noteName.length < 3 || noteName.length > 25) {
      return 'Name must have between 3 and 25 characters'
    }else if (isNoteDuplicate){
      return 'Note name already exists';
    }
  }

  render() {
    return (
      <form onSubmit={e => this.handleSubmit(e)}
        className="addNote">
        <div className="form-group">
          <label htmlFor="name">Note Name:</label>
          <input type="text" className="registrationControl"
            name="name" id="name"
            onChange={e => this.updateNoteName(e.target.value)} />
          {this.state.name.touched && <p className='validationError'>{this.validateNewNote()}</p>}
          <label htmlFor="name">Folder Name:</label>
          <input type="text" className="registrationControl"
            name="folderName" id="folderName"
            onChange={e => this.updateNoteFolder(e.target.value)} />
          <label htmlFor='content'>Note:</label>
          <textarea type="text" className="registrationControl"
            name="content" id="content"
            onChange={e => this.updateNoteContent(e.target.value)} />
          <div>
            <button disabled={this.validateNewNote()}
              type="submit" className="addNoteButton">
              Submit
            </button>
          </div>
        </div>
      </form>
    );
  }
}