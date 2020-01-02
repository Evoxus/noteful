import React from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import DeleteNote from '../DeleteNote/DeleteNote';
import './Note.css';

export default function Note(props) {
  return (
    <div className='Note'>
      <h3>
        <Link to={`/note/${props.id}`} >{props.name}</Link>
      </h3>
      <p><span className='Date'>
        { format(parseISO(props.modified), 'do MMM yyyy') }
      </span></p>
      <DeleteNote />
    </div>
  )
}