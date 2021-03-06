import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import NoteContext from '../NoteContext';
import PropType from 'prop-types';
import './Note.css';
import { BASE_API } from '../config';

export default class Note extends Component {
  static defaultProps = {
    onDeleteNote: () => { },
  }

  static contextType = NoteContext;

  handleClickDelete = e => {
    e.preventDefault()
    const noteId = this.props.id
    fetch(`${BASE_API}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
      })
      .catch(error => {
        console.error({ error })
      })
    this.props.onDeleteNote(noteId)
    this.context.deleteNote(noteId)
    // allow parent to perform extra behaviour
  }

  render() {
    return (
      <div className='Note'>
        <h3>
          <Link className='NoteTitle' to={`/note/${this.props.id}`} >{this.props.name}</Link>
        </h3>
        <p className='flexContainer'>
          <span className='Date'>
            Modified {this.props.modified && format(parseISO(this.props.modified), 'do MMM yyyy')}
          </span>
          <button className='DeleteNote' type='button' onClick={this.handleClickDelete}>DeleteNote</button>
        </p>
      </div>
    )
  }
}

Note.defaultProps = {
  note: {
    id: 1,
    note_name: 'Note',
    modified: new Date(),
    handleClickDelete: () => { },
  }
}

Note.propType = {
  name: PropType.string.isRequired,
  modified: PropType.string.isRequired,
  onDeleteNote: PropType.func.isRequired
}