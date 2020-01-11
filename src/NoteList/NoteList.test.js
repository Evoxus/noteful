import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import NoteList from './NoteList';

describe('App component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter> <NoteList /> </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  })
  it('snapshot test', () => {
    const wrapper = shallow(<NoteList />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})