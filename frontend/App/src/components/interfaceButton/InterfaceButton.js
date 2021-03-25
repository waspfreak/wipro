import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import { Icon } from '../icon/Icon';
import { colors } from '../../styles/colors';

export const InterfaceButton = ({
  title,
  subtitle,
  onPress,
  plus,
  color,
  interfaceStyle
}) => {
  const iconName = plus ? 'PlusLarge' : 'Activity';
  const iconFillColor = plus ? color : colors.white;
  const iconSize = plus ? 28 : 50;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, interfaceStyle]}
    >
      <View
        style={[
          styles.buttonBackground,
          color && { backgroundColor: color },
          plus && { ...styles.buttonBorder, borderColor: color }
        ]}
      >
        <Icon
          name={iconName}
          fill={iconFillColor}
          height={iconSize}
          width={iconSize}
        />
      </View>
      <View style={styles.containerInfo}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

InterfaceButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  plus: PropTypes.bool,
  color: PropTypes.string,
  interfaceStyle: PropTypes.object
};

InterfaceButton.defaultProps = {
  color: colors.black
};

export default InterfaceButton;
