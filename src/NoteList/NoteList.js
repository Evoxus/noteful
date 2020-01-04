import React from 'react';
import Note from '../Note/Note';
import './NoteList.css';
import NoteContext from '../NoteContext';


export default function NoteList(props) {
  return (
    <NoteContext.Consumer>
      {(value) => {
        const notes = value.notes.map(note =>
          <li key={note.id}>
            <Note modified={note.modified}
              name={note.name} id={note.id}
            />
          </li>
        );
        return (
          <section className='NoteList'>
            <ul>
              {notes}
            </ul>
          </section>
        )
      }}
    </NoteContext.Consumer>

  )
}

NoteList.defaultProps = {
  notes: []
}