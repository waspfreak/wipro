import React from 'react';
import TabBarIcon from './TabBarIcon';
import { render } from '@testing-library/react-native';

describe('TabBarIcon tests', () => {
  const navigationNames = [
    'Home',
    'Hey',
    'Find',
    'Activity',
    'User',
    'default'
  ];

  it('sets right images for all possible menu items', () => {
    navigationNames.map((item, index) => {
      const { baseElement } = render(<TabBarIcon name={item} focused={true} />);
      expect(baseElement).toMatchSnapshot();
    });
  });
});
