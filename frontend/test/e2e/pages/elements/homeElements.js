export default class HomeElements {
  getTopicTeamList() {
    return element(by.id('topicsListTeam'));
  }

  getTopicsList() {
    return element(by.id('topicsListProject'));
  }

  getHQList() {
    return element(by.id('topicsListHQ'));
  }

  getNoticePanel() {
    return element(by.id('noticePanelClose'));
  }
}
