import React from 'react';
import Button from './Button';
import { render } from '@testing-library/react-native';

describe('Button tests', () => {
  let props;

  beforeEach(() => {
    props = {
      onPress: jest.fn(),
      icon: 'Arrow',
      title: 'Next'
    };
  });

  it('renders default button text', () => {
    const { getByText } = render(<Button {...props} />);
    const button = getByText('Next');
    expect(button).toBeTruthy();
  });
});
