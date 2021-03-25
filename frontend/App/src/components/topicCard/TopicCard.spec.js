import React from 'react';
import TopicCard from './TopicCard';
import {
  render,
  NativeTestEvent,
  fireEvent,
  wait,
  waitForElement
} from '@testing-library/react-native';

describe('TopicCard tests', () => {
  let props;
  beforeEach(() => {
    props = {
      title: 'Title',
      description: 'this is a description',
      onPress: jest.fn(),
      members: ['first member', 'second test']
    };
  });

  it('should match TopicCard snapshot', () => {
    const { baseElement } = render(<TopicCard {...props} />);
    expect(baseElement).toMatchSnapshot();
  });

  // TODO: Needs improving this test
  it('should use layout event to work out height restrictions', async () => {
    const { baseElement, getByTestId } = render(<TopicCard {...props} />);
    const titleText = await waitForElement(() => getByTestId('Title'));
    fireEvent(
      baseElement,
      new NativeTestEvent('onLayout', {
        nativeEvent: { layout: { height: 100, lines: 3 } }
      })
    );
    await wait(() => expect(titleText).toBeTruthy());
  });
});
