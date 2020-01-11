import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import AddFolder from './AddFolder';

describe('App component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AddFolder />, div);
    ReactDOM.unmountComponentAtNode(div);
  })
  it('snapshot test', () => {
    const wrapper = shallow(<AddFolder />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})