import React from 'react';
import { shallow } from 'enzyme';
import ListItem from './ListItem';

describe('List tests', () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      title: 'List Title',
      user: 'test user',
      description: 'LIst description',
      onPress: jest.fn(),
      members: null
    };
    component = shallow(<ListItem {...props} />);
  });

  it('renders default list text', () => {
    expect(component).toMatchSnapshot();
  });
});
