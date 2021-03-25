import React from 'react';
import { render } from '@testing-library/react-native';
import User from '../user/User';

describe('User tests', () => {
  it('should match User snapshot', () => {
    const { baseElement } = render(<User />);
    expect(baseElement).toMatchSnapshot();
  });
});
