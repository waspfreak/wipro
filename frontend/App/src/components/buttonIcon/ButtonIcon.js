import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import Icon from '../icon/Icon';
import colors from '../../styles/colors';
const ButtonIcon = ({
  onPress,
  pressColor,
  icon,
  iconColor,
  iconSizeHeight,
  iconSizeWidth,
  marginLeft,
  marginRight,
  color,
  testIdentifier
}) => {
  return (
    <TouchableHighlight
      style={[
        styles.buttonBackground,
        color && { backgroundColor: color },
        marginLeft && { marginLeft: marginLeft },
        marginRight && { marginRight: marginRight }
      ]}
      onPress={onPress}
      underlayColor={pressColor}
      testID={testIdentifier}
    >
      <View style={styles.content}>
        <Icon
          name={icon}
          fill={iconColor}
          height={iconSizeHeight}
          width={iconSizeWidth}
        />
      </View>
    </TouchableHighlight>
  );
};

ButtonIcon.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  iconColor: PropTypes.string,
  iconSizeHeight: PropTypes.string,
  iconSizeWidth: PropTypes.string,
  pressColor: PropTypes.string,
  color: PropTypes.string,
  marginRight: PropTypes.number,
  marginLeft: PropTypes.number
};

ButtonIcon.defaultProps = {
  color: colors.blue,
  pressColor: colors.lightBlue,
  iconColor: colors.white,
  testID: PropTypes.string,
  onPress: () => {}
};
export default ButtonIcon;
