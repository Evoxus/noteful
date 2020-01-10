import React, { Component } from 'react';
import NoteContext from '../NoteContext';
import './AddNote.css';

export default class AddNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: {
            value: '',
            touched: false
         },
         content: {
             value: '',
             touched: false
         },
       }
    }

render (){
    return (
        <form onSubmit={e => this.handleSubmit(e)}
        className="addNote">
        <div className="form-group">
          <label htmlFor="name">Note Name:</label>
          <input type="text" className="registration__control"
            name="name" id="name"
            onChange={e => this.updateFolder(e.target.value)} />
            <label htmlFor="name">Note Content:</label>
            <input type="text" className="registration__control"
            name="name" id="name"
            onChange={e => this.updateFolder(e.target.value)} />

            <div className='errorHandler'>{this.state.name.touched && <legend>{this.validateNewFolder()}</legend>}</div>

            <button type="submit" className="addFolder__button"
        //   disabled={this.validateNewFolder()}
        >
            Submit
          </button>
         
        </div>
      </form>
        );
    }
}