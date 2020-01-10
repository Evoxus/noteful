import React, { Component } from 'react';
import Note from '../Note/Note';
import './NoteList.css';
import NoteContext from '../NoteContext';
import { getNotesForFolder } from '../helperFunctions';
import { Link } from 'react-router-dom';

export default class NoteList extends Component {
  static defaultProps = {
    notes: [],
    match: { params: {} }
  }

  static contextType = NoteContext;

  handleDeleteNote = noteId => {
    console.log(this.props)
    this.props.history.push(`/`)
  }

  render() {
    const { folderId } = this.props.match.params;
    const notes = getNotesForFolder(this.context.notes, folderId).map(note =>
      <li key={note.id}>
        <Note modified={note.modified}
          name={note.name} id={note.id}
          onDeleteNote={this.handleDeleteNote}
        />
      </li>
    );
    return (
      <section className='NoteList'>
        <ul>
          {notes}
          <li key='addNote' className='addNoteButton'>
            <Link to='/AddNote'>Add Note</Link>
          </li>
        </ul>
      </section>
    )
  }
}