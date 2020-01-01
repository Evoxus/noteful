import React from 'react';
import Note from '../Note/Note';
import './NoteDetail.css';

export default function NoteDetail(props) {
  return (
    <section className='NotePageMain'>
      <Note
        id={props.note.id}
        name={props.note.name}
        modified={props.note.modified}
      />
      <div className='NotePageMain__content'>
        {props.note.content.split(/\n \r|\n/).map((content, idx) =>
          <p key={idx}>{content}</p>
        )}
      </div>
    </section>
  )
}

NoteDetail.defaultProps = {
  note: {
    content: '',
  }
}