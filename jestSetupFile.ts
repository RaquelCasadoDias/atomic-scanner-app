import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);

jest.mock('NativeModules', () => ({
  UIManager: {
    RCTView: () => {},
  },
  RNGestureHandlerModule: {
    attachGestureHandler: jest.fn(),
    createGestureHandler: jest.fn(),
    dropGestureHandler: jest.fn(),
    updateGestureHandler: jest.fn(),
    State: {},
    Directions: {},
  },
}));

jest.mock('react-native-permissions', () => ({
  check: _ => Promise.resolve(true),
  request: _ => Promise.resolve(true)
}));

jest.mock('./src/services/navigation/navigationService', () => {
  return {
    navigate: jest.fn(),
    setTopLevelNavigator: jest.fn(),
  };
});
