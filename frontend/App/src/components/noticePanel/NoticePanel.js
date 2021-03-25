import React from 'react';
import styles from './styles';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from '../icon/Icon';
import colors from '../../styles/colors';

const NoticePanel = ({ title, message, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} testID="noticePanel">
      <View style={styles.badge} />
      <View style={styles.topContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <TouchableOpacity
          onPress={() => onPress(title)}
          testID="noticePanelClose"
        >
          <View style={styles.iconContainer}>
            <Icon name="Close" fill={colors.black} height={22} width={22} />
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.summary}>{message}</Text>
      </View>
    </TouchableOpacity>
  );
};

NoticePanel.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string,
  onPress: PropTypes.func
};
export default NoticePanel;
