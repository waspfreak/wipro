import React from 'react';
import Home from './Home';
import {
  fireEvent,
  render,
  waitForElement
} from '@testing-library/react-native';
import { navigationPropMock } from '../../utils/propMocks';
import { testIds } from '../../constants/testIds';

jest.mock('LayoutAnimation');

describe('Home tests', () => {
  let props;
  let component;

  beforeEach(() => {
    props = {
      navigation: navigationPropMock
    };

    component = render(<Home {...props} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match Home snapshot', () => {
    const { baseElement } = component;
    expect(baseElement).toMatchSnapshot();
  });

  it('should display loading while retrieving list', async () => {
    const { queryByTestId } = component;
    expect(queryByTestId('loadingText')).toBeTruthy();
  });

  it('closes notice panel when close button is pressed', async () => {
    const { getByTestId, queryByTestId } = component;
    const noticePanelCloseButton = await waitForElement(() =>
      getByTestId('noticePanelClose')
    );
    fireEvent.press(noticePanelCloseButton);
    expect(queryByTestId('noticePanel')).toBeFalsy();
  });

  it('should open menu when menu button is pressed', () => {
    const { getByTestId } = component;
    const menu = getByTestId(testIds.menuButton);
    fireEvent.press(menu);
    expect(getByTestId(testIds.menuBody)).toBeTruthy();
  });
  it('should call navigate to go to new project or team when new menu is pressed', () => {
    const { getByTestId } = component;
    const newButton = getByTestId(testIds.menuItemOne);
    fireEvent.press(newButton);
    expect(navigationPropMock.navigate).toHaveBeenCalledWith('NewProjectOrTeam');
  });
});
