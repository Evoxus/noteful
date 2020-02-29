import React, { Component } from 'react';
import Folder from '../Folder/Folder';
import './Sidebar.css';
import NoteContext from '../NoteContext';
import { Link } from 'react-router-dom';

export default class Sidebar extends Component {
  render(){
  return (
    <NoteContext.Consumer>
      {(value) => {
        const folders = value.folders.map((folder, idx) => (
          <li key={idx}>
              <Folder folder={folder} notes={value.notes}/>
          </li>
        ))
        return (
          <nav className='Sidebar'>
            <ul>
              {folders}
              <li className='round' key='AddFolder'>
                <Link className='AddFolder' to='/AddFolder'>Add Folder</Link>
              </li>
            </ul>
          </nav>
        )
      }}
    </NoteContext.Consumer>
  )
  }
}