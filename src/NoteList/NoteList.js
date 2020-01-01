import React from 'react';
import Note from '../Note/Note';
import './NoteList.css';


export default function NoteList(props) {
  const notes = props.notes.map(note =>
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
}

NoteList.defaultProps = {
  notes: []
}