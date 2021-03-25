import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Header } from '../../components/header/Header';
import ButtonIcon from '../../components/buttonIcon/ButtonIcon';
import Button from '../../components/button/Button';
import InputField from '../../components/inputField/InputField';
import { SafeAreaView } from 'react-navigation';
import styles from './styles';
import { colors } from '../../styles';
import { oneTaskStoreInitialState } from '../../stores/initialGlobalState';
import { useGlobalStore } from '../../stores/globalStore';
import { testIds } from '../../constants/testIds';

export const MakeTopic = ({ navigation }) => {
  const [oneTaskStore, dispatch] = useGlobalStore();
  const [newTopic, setNewTopic] = useState({
    ...oneTaskStoreInitialState.topics.newTopic
  });

  useEffect(() => {
    if (newTopic.name.length > 0) {
      navigation.navigate('Topic');
    }
    // eslint-disable-next-line
  }, [oneTaskStore]);

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
  const RightMenu = () => {
    return (
      <Button
        wrapperStyle={styles.ButtonHeader}
        onPress={() => dispatch({ type: 'NEW_TOPIC', payload: { newTopic } })}
        title="Save"
        small
        tertiary
        disabled={newTopic.name === ''}
        testIdentifier={testIds.saveButton}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        wrapperStyle={styles.wrapperStyle}
        title="Make a Topic"
        left={leftMenu()}
        right={RightMenu()}
      />

      <View style={styles.mainContent}>
        <InputField
          label="Name this topic"
          placeholder="e.g. Office Renovation"
          onChangeText={name => setNewTopic({ ...newTopic, name })}
        />
        <InputField
          simple
          multiline
          inputStyle={styles.input}
          label="Add an additional description"
          placeholder="e.g. Plans and scheduling for expanding the office"
          onChangeText={description =>
            setNewTopic({ ...newTopic, description })
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default MakeTopic;

MakeTopic.navigationOptions = {
  header: null
};
