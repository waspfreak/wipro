import Elements from './elements/homeElements';
// import Utils from '../helpers/utils';

const elements = new Elements();
// const utils = new Utils();

export default class HomeScreen {
  async isLoaded() {
    await expect(elements.getHQList()).toBeVisible();
    // await utils.scrollToView(elements.getTopicTeamList());
    // await expect(elements.getTopicTeamList()).toBeVisible();
    // await utils.scrollToView(elements.getTopicsList());
    // await expect(elements.getTopicsList()).toBeVisible();
  }

  async hasNoticePanel(shouldBeVisible) {
    shouldBeVisible
      ? await expect(elements.getNoticePanel()).toBeVisible()
      : await expect(elements.getNoticePanel()).toBeNotVisible();
  }

  async closeNoticePanel() {
    await elements.getNoticePanel().tap();
  }
}
