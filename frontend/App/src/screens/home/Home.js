import React, { useState } from 'react';
import { SafeAreaView } from 'react-navigation';
import styles from './styles';
import { content } from '../../constants/Content';
import TopicCard from '../../components/topicCard/TopicCard';
import { LayoutAnimation, ScrollView, Text, View, Image } from 'react-native';
import config from '../../configs/config';
import { getListTopicsAsync } from './async';
import NoticePanel from '../../components/noticePanel/NoticePanel';
import { Header } from '../../components/header/Header';
import ButtonIcon from '../../components/buttonIcon/ButtonIcon';
import Menu, { MenuItem, Position } from '../../components/popUpMenu/';
import { oneWebLogo } from '../../assets/images/index';
import Icon from '../../components/icon/Icon';

import { useAsync } from 'react-async';
import {
  filterByKeyValue,
  sortAlphabeticallyByKeyValue,
  keyValueMatch
} from '../../utils/filterSortingUtils';
import InputField from '../../components/inputField/InputField';
import { debounce } from 'lodash';
import { testIds } from '../../constants/testIds';

const topicPressed = topic => {
  console.log(topic);
};

export const Home = ({ navigation }) => {
  const { data, error, isPending, reload, setData } = useAsync({
    promiseFn: getListTopicsAsync
  });
  const { topics, teams, hq } = content.home;
  const [showNotice, setNotice] = useState(true);

  const onNoticeClose = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.Presets.easeInEaseOut,
      () => {}
    );
    setNotice(!showNotice);
  };

  // Menu
  const menuContainerRef = React.createRef();
  let menuRef = null;
  const setMenuRef = ref => (menuRef = ref);
  const showMenu = () =>
    menuRef.show(menuContainerRef.current, Position.TOP_RIGHT);
  const hideMenu = () => menuRef.hide();
  const onPress = () => showMenu();

  const menuHandler = route => {
    hideMenu();
    navigation.navigate(route);
  };

  const searchHandler = searchText => {
    /* call to search api will go here */

    !searchText || searchText === ''
      ? reload()
      : setData(keyValueMatch(data, 'title', searchText), () =>
          console.log('data updated')
        );
  };
  const rightMenu = () => {
    return (
      <View>
        <View ref={menuContainerRef}>
          <ButtonIcon
            onPress={onPress}
            icon="More"
            iconColor="white"
            iconSizeWidth="22"
            iconSizeHeight="22"
            testIdentifier={testIds.menuButton}
          />
        </View>
        <Menu ref={setMenuRef} testID={testIds.menuBody}>
          <MenuItem
            title="Make a new project or team"
            onPress={() => menuHandler('NewProjectOrTeam')}
            iconName="Info"
            testIdentifier={testIds.menuItemOne}
          />
          <MenuItem title="View deleted projects/teams" iconName="Info" />
          <MenuItem
            last
            title="Adminland"
            iconName="Info"
            iconColor="#3478f6"
          />
        </Menu>
      </View>
    );
  };

  return config.features.topics ? (
    <SafeAreaView style={styles.container}>
      <Header
        title="TigerSpike Title"
        wrapperStyle={styles.headerWrapperStyle}
        right={rightMenu()}
      />

      <View styles={styles.searchContainer}>
        <InputField
          inputStyle={styles.inputStyle}
          placeholder="Jump to a project or team..."
          iconName="SearchOutline"
          onChangeText={debounce(searchHandler, 300)}
        />
      </View>
      {error ? <Text testID="ErrorText">{`${error}`} </Text> : null}
      {isPending ? (
        <View>
          <Text testID="loadingText">...loading topics</Text>
        </View>
      ) : (
        <View style={styles.scrollBarContainer} testID="scrollBarView">
          {showNotice && (
            <NoticePanel
              title={content.noticePanel.title}
              message={content.noticePanel.message}
              onPress={() => onNoticeClose()}
            />
          )}
          <ScrollView style={styles.scrollBar}>
            <View style={styles.titleContainer}>
              {filterByKeyValue(data, 'type', 'HQ').length > 0 ? (
                <Text style={styles.title} testID="HQTitle">
                  {hq}
                </Text>
              ) : null}
            </View>
            {filterByKeyValue(data, 'type', 'HQ').length > 0 ? (
              <View style={styles.topicsContainer} testID="topicsListHQ">
                <View style={styles.imageContainer}>
                  <Image resizeMode={'contain'} source={oneWebLogo} />
                </View>
                {sortAlphabeticallyByKeyValue(
                  filterByKeyValue(data, 'type', 'HQ'),
                  'title'
                ).map((item, index) => (
                  <View style={styles.item} key={index}>
                    <TopicCard
                      key={item.id}
                      title={item.title}
                      description={item.description}
                      members={item.members}
                      onPress={topicPressed}
                    />
                  </View>
                ))}
              </View>
            ) : null}
            <View style={styles.titleContainer}>
             <Icon name="Wifi" fill="#3478f6" height="45" width="45" />
              <Text style={styles.title} testID="myTestId">
                {teams}
              </Text>
            </View>

            {filterByKeyValue(data, 'type', 'TEAM').length > 0 ? (
              <View style={styles.topicsContainer} testID="topicsListTeam">
                {sortAlphabeticallyByKeyValue(
                  filterByKeyValue(data, 'type', 'TEAM'),
                  'title'
                ).map((item, index) => (
                  <View style={styles.item} key={index}>
                    <TopicCard
                      key={item.id}
                      title={item.title}
                      description={item.description}
                      members={item.members}
                      onPress={topicPressed}
                    />
                  </View>
                ))}
              </View>
            ) : (
              <Text testID="NoTeams">No Teams</Text>
            )}
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{topics}</Text>
            </View>
            {filterByKeyValue(data, 'type', 'PROJECT').length > 0 ? (
              <View style={styles.topicsContainer} testID="topicsListProject">
                {sortAlphabeticallyByKeyValue(
                  filterByKeyValue(data, 'type', 'PROJECT'),
                  'title'
                ).map((item, index) => (
                  <View style={styles.item} key={index}>
                    <TopicCard
                      key={item.id}
                      title={item.title}
                      description={item.description}
                      members={item.members}
                      onPress={topicPressed}
                    />
                  </View>
                ))}
              </View>
            ) : (
              <View>
                <Text testID="NoProjects">No Projects</Text>
              </View>
            )}
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  ) : (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View>
          <Text>{teams}</Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Home;

Home.navigationOptions = {
  header: null
};
