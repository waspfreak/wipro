export const navigationStatePropsMock = {
  routes: [],
  index: 0,
  isTransitioning: false,
  key: '',
  params: {
    test: 1
  }
};

export const navigationPropMock = {
  dangerouslyGetParent: jest.fn(),
  state: navigationStatePropsMock,
  dispatch: jest.fn(),
  goBack: jest.fn(),
  dismiss: jest.fn(),
  navigate: jest.fn(),
  openDrawer: jest.fn(),
  closeDrawer: jest.fn(),
  toggleDrawer: jest.fn(),
  getParam: jest.fn(),
  setParams: jest.fn(),
  addListener: jest.fn(),
  push: jest.fn(),
  replace: jest.fn(),
  pop: jest.fn(),
  popToTop: jest.fn(),
  isFocused: jest.fn(),
  reset: jest.fn(),
  isFirstRouteInParent: jest.fn()
};
