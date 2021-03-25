const SIGN_IN = 'SIGN_IN';
const NEW_TOPIC = 'NEW_TOPIC';

export const GlobalReducer = (state, action) => {
  switch (action.type) {
    case SIGN_IN:
      console.log('sign in');
      return {
        ...state,
        userStatus: action.payload.userStatus
      };
    case NEW_TOPIC:
      return {
        ...state,
        topics: { ...action.payload }
      };
    default:
      return state;
  }
};
