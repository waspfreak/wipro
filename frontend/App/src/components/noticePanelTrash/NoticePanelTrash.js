import React from 'react';
import styles from './styles';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

const NoticePanelTrash = ({ title, message }) => {
  return (
    <View style={styles.container} testID="noticePanel">
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
};

NoticePanelTrash.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string
};
export default NoticePanelTrash;
