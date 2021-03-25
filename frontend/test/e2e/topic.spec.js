import { content } from '../../App/src/constants/content';
import HomeScreen from './pages/homeScreen';
import Utils from './helpers/utils';

const homeScreen = new HomeScreen();
const utils = new Utils();

// Added Pause to be able to sign in and test the scenarios
// beforeAll(async () => {
//   await waitFor(element(by.label('Home')))
//     .toBeVisible()
//     .withTimeout(7000);
// });

describe('Topics, HQ, Teams and Projects View', () => {
  it('should close notice panel', async () => {
    await utils.isTextVisible(content.noticePanel.message);
    await homeScreen.closeNoticePanel();
    await homeScreen.hasNoticePanel(false);
    await homeScreen.isLoaded();
  });
});
