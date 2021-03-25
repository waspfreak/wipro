import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../storybook/decorators';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from './Icon';
import icons from '../../assets/svgs/icons';

const iconList = [];

const getIcons = () => {
  Object.keys(icons).forEach(iconName => {
    iconList.push(iconName);
  });
  return iconList;
};

storiesOf('Icons', module)
  .addDecorator(BufferView)
  .add('Icons ', () => (
    <ScrollView>
      <View style={styles.screen}>
        {getIcons().map((name, index) => (
          <View style={styles.container} key={index}>
            <Icon name={name} fill="#3478f6" height="28" width="28" />
            <Text style={styles.name}>{name}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  ),
  {
    notes: 'Icon Svg Collection. \n\n\n\nThe icon style use is the lite weight of the Streamline icons library with some custom modifications'
  });

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    padding: 20,
    marginTop: 20
  },
  container: {
    padding: 10,
    width: '50%',
    flexDirection: 'row'
  },
  name: {
    marginTop: 5,
    paddingLeft: 10
  }
});
