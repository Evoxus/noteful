import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import AddNote from './AddNote';
import dummyStore from '../dummy-store';

describe('App component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AddNote />, div);
    ReactDOM.unmountComponentAtNode(div);
  })
  // it('snapshot test', () => {
  //   const wrapper = shallow(<AddNote />)
  //   expect(toJson(wrapper)).toMatchSnapshot()
  // })
  // How to test with context?
})