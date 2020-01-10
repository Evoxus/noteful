import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Folder.css';

export default function Folder(props){
  return(
    <NavLink className='Folder' to={`/folder/${props.folder.id}`}>{props.folder.name}</NavLink>
  )
}

Folder.propTypes = {
  folder: PropTypes.object.isRequired
}