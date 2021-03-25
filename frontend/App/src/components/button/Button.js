import React from 'react';
import { Text, TouchableHighlight, ViewPropTypes, View } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';

import Icon from '../icon/Icon';

const Button = ({
  onPress,
  disabled,
  secondary,
  primary,
  red,
  tertiary,
  textStyle,
  title,
  children,
  large,
  small,
  pressColor,
  wrapperStyle,
  icon,
  iconColor,
  testIdentifier
}) => {
  let containerStyles = styles.container;
  let textStyles = styles.text;
  if (primary) {
    containerStyles = { ...containerStyles, ...styles.containerPrimary };
  }
  if (secondary) {
    containerStyles = { ...containerStyles, ...styles.containerSecondary };
    textStyles = { ...textStyles, ...styles.textSecondary };
  }
  if (tertiary) {
    containerStyles = { ...containerStyles, ...styles.containerTertiary };
    textStyles = { ...textStyles, ...styles.textTertiary };
  }
  if (red) {
    containerStyles = { ...containerStyles, ...styles.containerSecondaryRed };
    textStyles = { ...textStyles, ...styles.textSecondaryRed };
  }
  if (disabled) {
    containerStyles = { ...containerStyles, ...styles.containerDisabled };
    textStyles = { ...textStyle, ...styles.textDisabled };
  }
  if (large) {
    containerStyles = { ...containerStyles, ...styles.containerLarge };
  }
  if (small) {
    containerStyles = { ...containerStyles, ...styles.containerSmall };
  }

  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor={pressColor}
      style={[containerStyles, wrapperStyle]}
      testID={testIdentifier}
    >
      <View style={styles.content}>
        <Text style={textStyles}>{title}</Text>
        {icon && (
          <Icon
            style={styles.icon}
            name={icon}
            fill={iconColor}
            height={20}
            width={20}
          />
        )}
      </View>
    </TouchableHighlight>
  );
};

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  tertiary: PropTypes.bool,
  red: PropTypes.bool,
  title: PropTypes.string,
  icon: PropTypes.string,
  iconColor: PropTypes.string,
  large: PropTypes.bool,
  small: PropTypes.bool,
  wrapperStyle: ViewPropTypes.style,
  containerStyle: ViewPropTypes.style,
  textStyle: ViewPropTypes.style,
  pressColor: PropTypes.string
};

export default Button;
