import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import NewProjectOrTeam from './NewProjectOrTeam';
import { navigationPropMock } from '../../utils/propMocks';
import { testIds } from '../../constants/testIds';

describe('New Project or Team tests', () => {
  let props;
  let component;

  beforeEach(() => {
    props = {
      navigation: navigationPropMock
    };

    component = render(<NewProjectOrTeam {...props} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should match NewProjectOrTeam snapshot', () => {
    const { baseElement } = component;
    expect(baseElement).toMatchSnapshot();
  });
  it('should call navigate back when back button is pressed', () => {
    const { getByTestId } = component;
    const backChevron = getByTestId(testIds.backButton);
    fireEvent.press(backChevron);
    expect(navigationPropMock.goBack).toHaveBeenCalled();
  });
  it('should call navigate to go to topics when make topic button is pressed', () => {
    const { getByTestId } = component;
    const makeTopicButton = getByTestId('makeTopicButton');
    fireEvent.press(makeTopicButton);
    expect(navigationPropMock.navigate).toHaveBeenCalledWith('MakeTopic');
  });
});
