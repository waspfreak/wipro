import TabBarElements from './elements/tabBarElements';

const elements = new TabBarElements();

export default class TabBarScreen {
  async isVisible() {
    await expect(elements.getHome()).toBeVisible();
    await expect(elements.getProjects()).toBeVisible();
    await expect(elements.getUser()).toBeVisible();
  }

  async goToHome() {
    await elements.getHome().tap();
  }

  async goToHey() {
    await elements.getHey().tap();
  }

  async goToMe() {
    await elements.getMe().tap();
  }

  async goToActivity() {
    await elements.getActivity().tap();
  }

  async goToFind() {
    await elements.getFind().tap();
  }
}
