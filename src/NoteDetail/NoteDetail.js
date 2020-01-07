import React from 'react';
import Note from '../Note/Note';
import './NoteDetail.css';
import NoteContext from '../NoteContext';

export default function NoteDetail(props) {
  return (
    <NoteContext.Consumer>
      {(value) => {
        return (
          <section className='NoteDetail'>
            <Note
              id={value.note.id}
              name={value.note.name}
              modified={value.note.modified}
            />
            <div className='NoteContent'>
              {value.note.content.split(/\n \r|\n/).map((content, idx) =>
                <p key={idx}>{content}</p>
              )}
            </div>
          </section>
        )
      }}

    </NoteContext.Consumer>
  )
}

NoteDetail.defaultProps = {
  note: {
    content: '',
  }
}