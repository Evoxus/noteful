import React,{Component} from 'react';
import NoteContext from '../NoteContext';

export default class AddFolder extends Component{
    constructor(props){
    super(props);
    this.state = {
      name: {
        value: '',
        touched: false
     }
   }
}
static contextType = NoteContext;
updateFolder(value){
    this.setState({
        name: {
            value: value,
            touched: true
         }
    });
}

handleSubmit(e){
    const inputName = this.state.name.value;
    e.preventDefault();
    fetch('http://localhost:9090/folders', {
        method: 'POST', body: JSON.stringify({name:inputName}),
        headers: {
          'content-type': 'application/json'
        },
    });
}



validateNewFolder(){
    const folderName = this.state.name.value;

    if(folderName.length === 0){
        return 'Name is required'
    }else if(folderName.length < 6 && folderName.length > 25){
        return 'Name must have between 3 and 20 characters'
    }
}
    render(){
        return (
            <form onSubmit = {e => this.handleSubmit(e)}
             className="addFolder">
             <div className="form-group">
                <label htmlFor="name">Folder Name:</label>
                <input type="text" className="registration__control"
                 name="name" id="name"
                 onChange={e => this.updateFolder(e.target.value)}/>
                 <button disbled={this.validateNewFolder()} 
                 type="submit" className="addFolder__button">
                 Submit
                </button>
             </div>
          </form>
        );
    }
}