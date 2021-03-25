import React from 'react';
import { GlobalReducer } from './globalReducer';
import { oneTaskStoreInitialState } from './initialGlobalState';

describe('globalReducer tests', () => {
  it('should return state by default', () => {
    const state = GlobalReducer(oneTaskStoreInitialState, 'TEST');
    expect(state).toBe(oneTaskStoreInitialState);
  });
  it('should update state on SIGN_IN action', () => {
    const action = { type: 'SIGN_IN', payload: { userStatus: true } };
    const state = GlobalReducer(oneTaskStoreInitialState, action);
    expect(state.userStatus).toBe(true);
  });
  it('should update state on NEW_TOPIC action', () => {
    const newTopic = { name: 'test name', description: 'test description' };
    const action = { type: 'NEW_TOPIC', payload: newTopic };
    const state = GlobalReducer(oneTaskStoreInitialState, action);
    expect(JSON.stringify(state.topics)).toBe(JSON.stringify(newTopic));
  });
});
