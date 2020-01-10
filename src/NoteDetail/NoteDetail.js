import React, { Component } from 'react';
import Note from '../Note/Note';
import './NoteDetail.css';
import NoteContext from '../NoteContext';
import { findNote } from '../helperFunctions';

export default class NoteDetail extends Component {
  
  handleDeleteNote = noteId => {
    this.props.history.push(`/`)
  }

  render() {

  const { noteId } = this.props.match.params;
  
  return (
    <NoteContext.Consumer>
      {(value) => {
        const note = findNote(value.notes, noteId)
        return (
          <section className='NoteDetail'>
            <Note
              id={note.id}
              name={note.name}
              modified={note.modified}
              onDeleteNote={this.handleDeleteNote}
            />
            <div className='NoteContent'>
              {note.content.split(/\n \r|\n/).map((content, idx) =>
                <p key={idx}>{content}</p>
              )}
            </div>
          </section>
        )
      }}
    </NoteContext.Consumer>
  )}
}

NoteDetail.defaultProps = {
  note: {
    content: '',
  }
}