import React, { Component } from 'react';
import NoteContext from '../NoteContext';
import './AddFolder.css';

export default class AddFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: '',
        touched: false
      }
    }
  }

  static defaultProps = {
    folders: [
      {
        id: 1,
        name: 'Folder'
    }]
  }

  static contextType = NoteContext;

  updateFolder(value) {
    this.setState({
      name: {
        value: value,
        touched: true
      }
    });
  }

  handleSubmit(e) {
    const inputName = this.state.name.value;
    e.preventDefault();
    fetch('https://noteful-json-server-42.herokuapp.com/folders', {
      method: 'POST',
      body: JSON.stringify({ name: inputName }),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => { this.context.addFolder(data) })
    this.props.history.push('/');
  }

  validateNewFolder() {
    const folderName = this.state.name.value;
    const isFolderDuplicate = this.context.folders.filter(item => item.name === folderName).length > 0;

    if (folderName.length === 0) {
      return 'Name is required'
    } else if (folderName.length < 2 || folderName.length > 25) {
      return 'Name must have between 2 and 25 characters'
    } else if (isFolderDuplicate) {
      return 'Folder name already exists'
    }
  }
  render() {
    return (
      <form onSubmit={e => this.handleSubmit(e)}
        className="addFolder">
        <div className="form-group">
          <label htmlFor="name">Folder Name</label>
          <input type="text" className="registrationControl"
            name="name" id="name"
            onChange={e => this.updateFolder(e.target.value)} />
            <div className='errorHandler'>{this.state.name.touched && <p>{this.validateNewFolder()}</p>}</div>
          <button type="submit" className="addFolderButton"
            disabled={this.validateNewFolder()}>
            Add Folder
          </button>
        </div>
      </form>
    );
  }
}