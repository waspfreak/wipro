import Reactotron, { overlay } from 'reactotron-react-native';
import { AsyncStorage } from '@react-native-community/async-storage';

Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure()
  .useReactNative({ storybook: true })
  .use(overlay())
  .connect();

console.tron = Reactotron;
console.error = error => {
  Reactotron.reportError(error);
};
console.log = (message, ...rest) => {
  if (message instanceof Error) {
    Reactotron.reportError(message);
    if (rest.length > 0) {
      Reactotron.log(...rest);
    }
  } else {
    Reactotron.logImportant(message, ...rest);
  }
};

Reactotron.onCustomCommand({
  command: 'storybook',
  handler: () => {},
  title: 'Storybook switcher',
  description: 'Toggle between app and storybook'
});

export default Reactotron;
