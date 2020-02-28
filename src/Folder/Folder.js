import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Folder.css';

export default function Folder(props){
  return(
    <NavLink className='Folder' to={`/folder/${props.folder.id}`}>{props.folder.folder_name}</NavLink>
  )
}

Folder.defaultProps = {
  folder: {
    id: 1,
    name: 'Folder'
  }
}

Folder.propTypes = {
  folder: PropTypes.object.isRequired
}