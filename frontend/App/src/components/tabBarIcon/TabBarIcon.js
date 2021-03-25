import React from 'react';
import {  View } from 'react-native';
import * as images from '../../assets/images';
import styles from './styles';
import PropTypes from 'prop-types';
import Icon from '../../components/icon/Icon';

export const TabBarIcon = ({ name, focused }) => {
  let setIcon;
  let fill = 'none';
  switch (name) {
    case 'Home':
      setIcon = 'Home';
      fill = "gray"
      fill = focused ? '#1b6ac9' : 'gray';
      break;
    case 'Hey':
      setIcon = 'Inbox';
      break;
    case 'User':
      setIcon = 'Profile';
      break;
    case 'Activity':
      setIcon = 'Action';
      break;
    case 'Find':
      setIcon = 'Search';
      break;
    default:
      setIcon = '';
  }

  stroke = focused ? '#1b6ac9' : 'gray';
  return (
    <View>
      <Icon style={styles.icon} fill={fill} stroke={stroke} width={26} height={26} name={setIcon} />
    </View>
  );
};

TabBarIcon.propTypes = {
  name: PropTypes.string.isRequired,
  focused: PropTypes.bool.isRequired
};

export default TabBarIcon;
