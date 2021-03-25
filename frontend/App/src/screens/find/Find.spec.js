import React from 'react';
import Find from './Find';
import { render } from '@testing-library/react-native';

describe('Find tests', () => {
  it('should match Find snapshot', () => {
    const { baseElement } = render(<Find />);
    expect(baseElement).toMatchSnapshot();
  });
});
