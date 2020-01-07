import React from 'react';
import Note from '../Note/Note';
import './NoteList.css';
import NoteContext from '../NoteContext';
import { getNotesForFolder } from '../helperFunctions';

export default function NoteList(props) {
  const { folderId } = props.match.params;
  return (
    <NoteContext.Consumer>
      {(value) => {
        const notes = getNotesForFolder(value.notes, folderId).map(note =>
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