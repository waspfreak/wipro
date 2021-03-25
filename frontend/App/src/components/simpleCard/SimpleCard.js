import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';

export const SimpleCard = ({ title, children }) => {
  const textView = [styles.textView];
  if (!title) {
    textView.push(styles.textViewHide);
  }
  return (
    <View style={styles.container}>
      <View style={textView}>
        <Text style={styles.text}>{title}</Text>
      </View>
      {children}
    </View>
  );
};

SimpleCard.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
};

export default SimpleCard;
