import React from 'react';
import { View } from 'react-native';
import { Header } from '../../components/header/Header';
import ButtonMakeProject from '../../components/buttonMakeProject/ButtonMakeProject';
import ButtonIcon from '../../components/buttonIcon/ButtonIcon';
import { SafeAreaView } from 'react-navigation';
import styles from './styles';
import { colors } from '../../styles';
import { content } from '../../constants/Content';
import { testIds } from '../../constants/testIds';

export const NewProjectOrTeam = ({ navigation }) => {
  const leftMenu = () => {
    return (
      <ButtonIcon
        onPress={() => navigation.goBack()}
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
  return (
    <SafeAreaView style={styles.container}>
      <Header title="New Project or Team" left={leftMenu()} />
      <View style={styles.mainContent}>
        <ButtonMakeProject
          onPress={() => navigation.navigate('MakeTopic')}
          title={content.newProject.title}
          subtitle={content.newProject.subtitle}
          testIdentifier="makeTopicButton"
        />
        <ButtonMakeProject
          title={content.newTeam.title}
          subtitle={content.newTeam.subtitle}
        />
      </View>
    </SafeAreaView>
  );
};

export default NewProjectOrTeam;

NewProjectOrTeam.navigationOptions = {
  header: null
};
