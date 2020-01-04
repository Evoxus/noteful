import React from 'react';
import { NavLink } from 'react-router-dom';
import './Folder.css';

export default function Folder(props){
  return(
    <NavLink className='Folder' to={`/folder/${props.folder.id}`}>{props.folder.name}</NavLink>
  )
}