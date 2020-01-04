import React from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import DeleteNote from '../DeleteNote/DeleteNote';
import './Note.css';

export default function Note(props) {
  return (
    <div className='Note'>
      <h4>
        <Link to={`/note/${props.id}`} >{props.name}</Link>
      </h4>
      <p className='flexContainer'>
        <span className='Date'>
          { format(parseISO(props.modified), 'do MMM yyyy') }
        </span>
        <DeleteNote />
      </p>
      
    </div>
  )
}