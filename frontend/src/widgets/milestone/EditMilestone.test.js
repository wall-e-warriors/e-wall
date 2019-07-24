import { shallow } from 'enzyme';
import EditMilestone from './EditMilestone.js';
import React from 'react';

describe('Edit Milestone', () => {
  it('render page with edit component', () => {
    let milestone = {
      id: 1,
      date: '2019-09-12',
      description: 'Milestone !'
    };

    const wrapper = shallow(<EditMilestone milestone={milestone}/>);

    let description = wrapper.find('#description');
    let date = wrapper.find('#date');
    let button = wrapper.find('#confirm');
    expect(description.props().value).toBe('Milestone !');
    expect(date.props().value).toBe('2019-09-12');
    expect(button.props().children).toBe('Ok');
  });
});
