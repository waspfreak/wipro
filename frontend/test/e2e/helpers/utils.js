export default class Utils {
  async isTextVisible(text) {
    await expect(element(by.text(text))).toBeVisible();
  }

  async isLabelVisible(text) {
    await expect(element(by.label(text))).toBeVisible();
  }

  async scrollToBottom() {
    await element(by.id('scrollBarView')).scrollTo('bottom');
  }

  async scrollToTop() {
    await element(by.id('scrollBarView')).scrollTo('top');
  }

  async scrollToView(view) {
    await view.scrollTo('top');
  }
}
