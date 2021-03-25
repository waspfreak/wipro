import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Topic from './Topic';
import { navigationPropMock } from '../../utils/propMocks';
import { StateProvider } from '../../stores/globalStore';
import { GlobalReducer } from '../../stores/globalReducer';
import { oneTaskStoreInitialState } from '../../stores/initialGlobalState';
import { testIds } from '../../constants/testIds';

describe('Topic screen', () => {
  let props;
  let component;

  beforeEach(() => {
    props = {
      navigation: navigationPropMock
    };

    component = render(
      <StateProvider
        initialState={oneTaskStoreInitialState}
        reducer={GlobalReducer}
      >
        <Topic {...props} />
      </StateProvider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match Topic snapshot', () => {
    const { baseElement } = component;
    expect(baseElement).toMatchSnapshot();
  });

  it('should open menu when menu button is pressed', () => {
    const { getByTestId } = component;
    const menu = getByTestId(testIds.menuButton);
    fireEvent.press(menu);
    expect(getByTestId(testIds.menuBody)).toBeTruthy();
  });

  it('should navigate to right screen on menu press', () => {
    const { getByTestId, getByText } = component;
    const menu = getByTestId(testIds.menuButton);
    fireEvent.press(menu);
    expect(getByTestId(testIds.menuButton)).toBeTruthy();
    fireEvent.press(getByText('Edit'));
    expect(navigationPropMock.navigate).toBeCalledWith('Home');
  });

  it('should call navigation back when back button is pressed', () => {
    const { getByTestId } = component;
    const backChevron = getByTestId(testIds.backButton);
    fireEvent.press(backChevron);
    expect(navigationPropMock.navigate).toBeCalledWith('Home');
  });
});
