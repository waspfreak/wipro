import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';

const ButtonMakeProject = ({ title, subtitle, onPress, testIdentifier }) => {
  return (
    <TouchableOpacity onPress={onPress} testID={testIdentifier}>
      <View style={styles.container}>
        <View style={styles.iconContainer} />
        <Text style={styles.title}> {title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

ButtonMakeProject.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  onPress: PropTypes.func
};

export default ButtonMakeProject;
