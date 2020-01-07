import React from 'react';
import Folder from '../Folder/Folder';
import './Sidebar.css';

export default function Sidebar(props) {
  const folders = props.folders.map(folder => (
    <li key={folder.id}>
      <Folder folder={folder} />
    </li>
  ))
  return (
    <nav className='Sidebar'>
      <ul>
        {folders}
      </ul>
    </nav>
  )
}