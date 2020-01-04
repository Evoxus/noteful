import React from 'react';
import Folder from '../Folder/Folder';
import './Sidebar.css';
import NoteContext from '../NoteContext';

export default function Sidebar(props) {
  return (
    <NoteContext.Consumer>
      {(value) => {
        const folders = value.folders.map(folder => (
          <li>
            <Folder key={folder.id} folder={folder} />
          </li>
        ))
        return (
          <nav className='Sidebar'>
            <ul>
              {folders}
            </ul>
          </nav>
        )
      }}
    </NoteContext.Consumer>
  )
}