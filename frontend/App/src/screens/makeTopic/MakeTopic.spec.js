import React from 'react';
import {
  render,
  fireEvent,
  waitForElement
} from '@testing-library/react-native';
import MakeTopic from './MakeTopic';
import { navigationPropMock } from '../../utils/propMocks';
import { StateProvider } from '../../stores/globalStore';
import { GlobalReducer } from '../../stores/globalReducer';
import { oneTaskStoreInitialState } from '../../stores/initialGlobalState';
import styles from '../../components/button/styles';
import { testIds } from '../../constants/testIds';

describe('Create Topic Screen tests', () => {
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
        <MakeTopic {...props} />
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

  it('should call navigate back when back button is pressed', () => {
    const { getByTestId } = component;
    const backChevron = getByTestId(testIds.backButton);
    fireEvent.press(backChevron);
    expect(navigationPropMock.goBack).toHaveBeenCalled();
  });

  it('should dispatch new topic event when save is pressed', async () => {
    const { getByPlaceholderText, getByTestId } = component;
    const [
      nameTextInput,
      descriptionInput,
      saveButton
    ] = await waitForElement(() => [
      getByPlaceholderText('e.g. Office Renovation'),
      getByPlaceholderText(
        'e.g. Plans and scheduling for expanding the office'
      ),
      getByTestId(testIds.saveButton)
    ]);
    fireEvent.changeText(nameTextInput, 'My topic name');
    fireEvent.changeText(descriptionInput, 'My topic name');
    fireEvent.press(saveButton);
    expect(navigationPropMock.navigate).toBeCalledWith('Topic');
  });

  it('should enable menu button when user enters a topic', async () => {
    const { getByPlaceholderText, getByTestId } = component;
    const [nameTextInput, saveButton] = await waitForElement(() => [
      getByPlaceholderText('e.g. Office Renovation'),
      getByTestId(testIds.saveButton)
    ]);
    expect(saveButton.props.style[0].backgroundColor).toBe(
      styles.containerDisabled.backgroundColor
    );
    fireEvent.changeText(nameTextInput, 'My topic name');
    expect(saveButton.props.style[0].backgroundColor).toBe(
      styles.containerTertiary.backgroundColor
    );
  });
});
