import React from 'react';
import Activities from './Activities';
import { render } from '@testing-library/react-native';

describe('Activities tests', () => {
  it('should match Activities snapshot', () => {
    const { baseElement } = render(<Activities />);
    expect(baseElement).toMatchSnapshot();
  });
});
