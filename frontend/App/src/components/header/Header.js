import React from 'react';
import styles from './styles';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';

export const Header = ({ title, left, center, right, wrapperStyle }) => {
  return (
    <View style={[styles.header, wrapperStyle]}>
      {left && <View style={styles.leftContainer}>{left}</View>}
      {title && <Text style={styles.title}>{title}</Text>}
      {center && { center }}
      {right && <View style={styles.rightContainer}>{right}</View>}
    </View>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  left: PropTypes.node,
  right: PropTypes.node,
  center: PropTypes.node
};
export default Header;
