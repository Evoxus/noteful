import React from 'react';
import Folder from '../Folder/Folder';
import './Sidebar.css';
import NoteContext from '../NoteContext';
import AddFolder from '../AddFolder/AddFolder'
import {Link} from 'react-router-dom';

export default function Sidebar(props) {
  return (
    <NoteContext.Consumer>
      {(value) => {
        const folders = value.folders.map((folder, idx) => (
          <li key={idx}>
            <Folder folder={folder} />
          </li>
        ))
        return (
          <nav className='Sidebar'>
            <ul>
              {folders}
              <li key='AddFolder'>
              <Link to='/AddFolder'>Add Folder</Link>
              </li>
              
            </ul>
          </nav>
        )
      }}
    </NoteContext.Consumer>
  )
}