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
    let result;
    for(let i = 0; i < folders.length; i++) {
      if (folders[i].name === folderName) {
        result = folders[i].id
      }
      return result
    }
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
    console.log(newNote);
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
    this.setState({
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
    })
  }

  validateNewNote() {
    const noteName = this.state.name.value;
    if (noteName.length === 0) {
      return 'Name is required'
    } else if (noteName.length < 6 && noteName.length > 25) {
      return 'Name must have between 3 and 20 characters'
    }
  }

  render() {
    return (
      <form onSubmit={e => this.handleSubmit(e)}
        className="addNote">
        <div className="form-group">
          <label htmlFor="name">Note Name:</label>
          <input type="text" className="registration__control"
            name="name" id="name"
            onChange={e => this.updateNoteName(e.target.value)} />
          {this.validateNewNote() && this.state.name.touched && <p className='validationError'>{this.validateNewNote()}</p>}
          <label htmlFor="name">Folder Name:</label>
          <input type="text" className="registration__control"
            name="folderName" id="folderName"
            onChange={e => this.updateNoteFolder(e.target.value)} />
          <label htmlFor='content'>Note:</label>
          <textarea type="text" className="registration__control"
            name="content" id="content"
            onChange={e => this.updateNoteContent(e.target.value)} />
          <div>
            <button disbled={this.validateNewNote()}
              type="submit" className="addNote__button">
              Submit
            </button>
          </div>
        </div>
      </form>
    );
  }
}