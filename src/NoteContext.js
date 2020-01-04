import React from 'react';

const NoteContext = React.createContext({
  folders: [],
  notes: [],
  deleteNote: () =>{},
  findNote: () => {},
  getNotesForFolder: () => {},
})

export default NoteContext;