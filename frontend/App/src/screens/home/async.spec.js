import { getListTopicsAsync } from './async';
import Home from './Home';
import { render, waitForElement } from '@testing-library/react-native';
import React from 'react';
import { listTopicsResponse } from '../../constants/fakeData/listTopics';
import {
  filterByKeyValue,
  sortAlphabeticallyByKeyValue
} from '../../utils/filterSortingUtils';

jest.mock('./async.js', () => {
  return {
    getListTopicsAsync: jest.fn()
  };
});
jest.mock('../../utils/filterSortingUtils', () => {
  return {
    filterByKeyValue: jest.fn(),
    sortAlphabeticallyByKeyValue: jest.fn()
  };
});

describe('topics async tests', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should show projects and teams given results', async () => {
    filterByKeyValue.mockImplementation(() => {
      return listTopicsResponse;
    });
    sortAlphabeticallyByKeyValue.mockImplementation(() => {
      return listTopicsResponse;
    });
    getListTopicsAsync.mockImplementation(() => {
      return { data: listTopicsResponse };
    });

    const { queryByTestId, getByTestId } = render(<Home />);

    const [topicsListTeams, topicsListProjects] = await waitForElement(() => [
      getByTestId('topicsListTeam'),
      getByTestId('topicsListProject')
    ]);
    expect(topicsListTeams).toBeTruthy();
    expect(topicsListProjects).toBeTruthy();
    expect(queryByTestId('loadingText')).toBeFalsy();
  });

  it('should display right message if no results', async () => {
    filterByKeyValue.mockImplementation(() => {
      return [];
    });
    sortAlphabeticallyByKeyValue.mockImplementation(() => {
      return [];
    });
    getListTopicsAsync.mockImplementation(() => {
      return { data: [] };
    });

    const { queryByTestId, getByTestId } = render(<Home />);

    const [NoProjects, NoTeams] = await waitForElement(() => [
      getByTestId('NoProjects'),
      getByTestId('NoTeams')
    ]);
    expect(NoProjects).toBeTruthy();
    expect(NoTeams).toBeTruthy();
    expect(queryByTestId('topicsListTeam')).toBeFalsy();
    expect(queryByTestId('topicsListProject')).toBeFalsy();
  });
  // generates act warning
  it('should display loading while retrieving results', async () => {
    getListTopicsAsync.mockImplementation(() => {
      return { isPending: true };
    });
    const { getByText } = render(<Home />);
    expect(getByText('...loading topics')).toBeTruthy();
  });

  it('should display error if error is returned by api', async () => {
    getListTopicsAsync.mockImplementation(() => {
      return { error: 'Error' };
    });
    const { queryByTestId } = render(<Home />);
    const loadingErrorText = await waitForElement(() =>
      queryByTestId('ErrorText')
    );
    expect(loadingErrorText).toBeTruthy();
  });
});
