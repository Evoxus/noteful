import React from 'react';
import Note from '../Note/Note';
import './NoteDetail.css';
import NoteContext from '../NoteContext';

export default function NoteDetail(props) {
  return (
    // <NoteContext.Consumer>
      <section className='NoteDetail'>
        <Note
          id={props.note.id}
          name={props.note.name}
          modified={props.note.modified}
        />
        <div className='NoteContent'>
          {props.note.content.split(/\n \r|\n/).map((content, idx) =>
            <p key={idx}>{content}</p>
          )}
        </div>
      </section>
    // </NoteContext.Consumer>
  )
}

NoteDetail.defaultProps = {
  note: {
    content: '',
  }
}