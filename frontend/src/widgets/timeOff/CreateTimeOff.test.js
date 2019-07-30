import {shallow} from 'enzyme';
import React from 'react';
import CreateTimeOff from './CreateTimeOff';

describe('Create TimeOff', () => {
  it('render page with create component', () => {
    const wrapper = shallow(<CreateTimeOff/>);

    let name = wrapper.find('#name');
    let description = wrapper.find('#description');
    // let startDate = wrapper.find('#startDate');
    // let endDate = wrapper.find('#endDate');
    let button = wrapper.find('#create');

    expect(name.props().required).toBeTruthy();
    expect(description.props().required).toBeTruthy();
    // expect(startDate.props().required).toBeTruthy();
    // expect(endDate.props().required).toBeTruthy();
    expect(button.props().children).toBe('Create');
  });
});
