import React from 'react';
import Hey from './Hey';
import { render } from '@testing-library/react-native';

describe('Hey tests', () => {
  it('should match Hey snapshot', () => {
    const { baseElement } = render(<Hey />);
    expect(baseElement).toMatchSnapshot();
  });
});
