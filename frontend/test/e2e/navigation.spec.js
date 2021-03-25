import TabBarScreen from './pages/tabBarScreen';
import Utils from './helpers/utils';
import HomeScreen from './pages/homeScreen';

const tabBarScreen = new TabBarScreen();
const utils = new Utils();
const homeScreen = new HomeScreen();

// Added Pause to be able to sign in and test the scenarios
// beforeAll(async () => {
//   await waitFor(element(by.label('Home')))
//     .toBeVisible()
//     .withTimeout(7000);
// });

describe('Navigation example', () => {
  it('should show message on Activity page', async () => {
    await tabBarScreen.goToHome();
    await homeScreen.isLoaded();
    await tabBarScreen.goToMe();
    await utils.isTextVisible("The User screen aka 'My stuff' lives here");
    await tabBarScreen.goToFind();
    await utils.isTextVisible('This is the Find page');
    await tabBarScreen.goToActivity();
    await utils.isTextVisible('This is the Activity page');
    await tabBarScreen.goToHey();
    await utils.isTextVisible('This is the Hey page');
  });
});
