import React from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import Icon from '../icon/Icon';
import colors from '../../styles/colors';

export const MenuItem = ({ title, onPress, iconName, iconColor, last, testIdentifier }) => {
  return (
    <TouchableWithoutFeedback style={styles.menuItem} onPress={onPress} testID={testIdentifier}>
      <View style={styles.itemContainer}>
        <View style={styles.iconContainer}>
          <Icon name={iconName} fill={iconColor} height="25" width="25" />
        </View>
        <View style={styles.textMenuItem}>
          <Text>{title}</Text>
          <View
            style={last ? styles.dividerMenuItemLast : styles.dividerMenuItem}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

MenuItem.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  iconName: PropTypes.string,
  iconColor: PropTypes.string,
  last: PropTypes.bool
};

MenuItem.defaultProps = {
  iconColor: colors.blue
};

export default MenuItem;
