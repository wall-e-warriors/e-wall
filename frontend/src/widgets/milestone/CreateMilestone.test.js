import { shallow } from 'enzyme';
import React from 'react';
import CreateMilestone from './CreateMilestone';

describe('Create Milestone', () => {
  it('render page with create component', () => {
    const wrapper = shallow(<CreateMilestone />);

    let description = wrapper.find('#description');
    let button = wrapper.find('#confirm');
    expect(description.props().required).toBeTruthy();
    // expect(date.props().required).toBeTruthy();
    expect(button.props().children).toBe('Create');
  });
});
