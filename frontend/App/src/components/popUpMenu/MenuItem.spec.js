import React from 'react';
import { render } from '@testing-library/react-native';
import MenuItem from './MenuItem';

describe('MenuItem tests', () => {
  it('should match MenuItem snapshot', () => {
    const { baseElement } = render(<MenuItem />);
    expect(baseElement).toMatchSnapshot();
  });
});
