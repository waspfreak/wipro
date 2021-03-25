import React from 'react';
import styles from './styles';
import { initialsFromName } from '../../utils/initialsFromName';
import { mapStringToArray } from '../../utils/mapStringToArray';
import PropTypes from 'prop-types';
import { ViewPropTypes, View, Text } from 'react-native';
import colors from '../../styles/colors';

export const ThumbnailInitials = ({ name, size, style, extraMembers }) => {
  const backgroundColors = [
    colors.primary,
    colors.black,
    colors.darkGrey,
    colors.midBrown,
    colors.blue,
    colors.darkGreen,
    colors.red
  ];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: mapStringToArray(name, backgroundColors)
        },
        { height: size, width: size },
        extraMembers ? styles.plusMembersStyle : null,
        extraMembers > 9 && extraMembers < 100
          ? styles.doubleDigitMembers
          : null,
        extraMembers >= 100 ? styles.tripleDigitMembers : null,
        style
      ]}
      testID="userAvatarInitials"
    >
      <Text
        style={[
          { color: extraMembers ? colors.midBrown : colors.white },
          styles.text,
          {
            fontSize: size / (size > 30 ? 2.5 : 2)
          }
        ]}
      >
        {extraMembers ? `+${extraMembers}` : initialsFromName(name)}
      </Text>
    </View>
  );
};

ThumbnailInitials.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  style: ViewPropTypes.style,
  extraMembers: PropTypes.number
};

export default ThumbnailInitials;
