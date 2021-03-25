import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { Header } from '../../components/header/Header';
import ButtonIcon from '../../components/buttonIcon/ButtonIcon';
import styles from './styles';
import { colors } from '../../styles';
import ThumbnailInitials from '../../components/thumbnailInitials/ThumbnailInitials';
import InterfaceButton from '../../components/interfaceButton/InterfaceButton';
import ListItem from '../../components/listItem/ListItem';
import Menu, { MenuItem } from '../../components/popUpMenu/';
import { useGlobalStore } from '../../stores/globalStore';
import { activities, infoItems } from '../../constants/fakeData/topic';
import { testIds } from '../../constants/testIds/index';

export const Topic = ({ navigation }) => {
  const [oneTaskStore] = useGlobalStore();
  const { topics } = oneTaskStore;
  const titleTopic = topics.newTopic.name;
  const subtitleTopic = topics.newTopic.description;

  // Menu
  const textRef = React.createRef();
  let menuRef = null;
  const setMenuRef = ref => (menuRef = ref);
  const showMenu = () => menuRef.show(textRef.current);
  const menuHandler = route => {
    menuRef.hide();
    navigation.navigate(route);
  };

  const leftMenu = () => {
    return (
      <ButtonIcon
        onPress={() => navigation.navigate('Home')}
        color="transparent"
        icon="LeftChevron"
        iconColor={colors.blue}
        iconSizeWidth="28"
        iconSizeHeight="28"
        marginLeft={16}
        testIdentifier={testIds.backButton}
      />
    );
  };
  const rightMenu = () => {
    return (
      <View ref={textRef}>
        <ButtonIcon
          onPress={() => showMenu()}
          icon="More"
          iconColor="white"
          iconSizeWidth="22"
          iconSizeHeight="22"
          marginRight={16}
          testIdentifier={testIds.menuButton}
        />
        <Menu ref={setMenuRef} testID={testIds.menuBody}>
          <MenuItem
            title="Edit"
            iconName="Alert"
            onPress={() => menuHandler('Home')}
          />
          <MenuItem title="Copy" iconName="Alert" />
          <MenuItem title="Notify when to-dos added" iconName="Alert" />
          <MenuItem last title="Add or remove people..." iconName="Alert" />
        </Menu>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        wrapperStyle={styles.wrapperStyle}
        left={leftMenu()}
        right={rightMenu()}
      />
      <ScrollView>
        <View style={styles.mainContent}>
          <View style={styles.topicContainer}>
            <Text style={styles.title}>{titleTopic}</Text>
            <Text style={styles.description}>{subtitleTopic} </Text>

            <View style={styles.user}>
              <ThumbnailInitials name="Joe Blo" size={32} />
            </View>
          </View>

          <View style={styles.infoContainer}>
            {infoItems.map((info, index) => (
              <InterfaceButton
                key={index}
                interfaceStyle={styles.interfaceStyle}
                title={info.title}
                subtitle={info.subtitle}
                color={info.color}
                onPress={() => {}}
              />
            ))}
          </View>

          <View style={styles.activityContainer}>
            <Text style={styles.title}>Latest activity</Text>
            <View>
              {activities.map(activity => (
                <ListItem
                  key={activity.id}
                  title={activity.title}
                  user={activity.user}
                  date={activity.date}
                  projectName={activity.projectName}
                  icon="Word"
                  color={colors.green}
                  description={activity.description}
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Topic;

Topic.navigationOptions = {
  header: null
};
