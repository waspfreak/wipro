import React from 'react';
import { Text, View, TextInput } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import colors from '../../styles/colors';
import Icon from '../icon/Icon';

const InputField = ({
  props,
  label,
  placeholder,
  value,
  inputStyle,
  iconName,
  iconFill,
  iconSize,
  error,
  onChangeText,
  multiline,
  numberOfLines,
  editable,
  keyboardType,
  returnKeyType
}) => {
  const inputStyles = [
    styles.input,
    inputStyle,
    iconName ? styles.iconInputStyle : null
  ];

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.inputContainer}>
        {iconName && (
          <View style={styles.iconContainer}>
            <Icon
              name={iconName}
              fill={iconFill || colors.darkGrey}
              height={iconSize || 30}
              width={iconSize || 30}
            />
          </View>
        )}
        <TextInput
          {...props}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          editable={editable}
          multiline={multiline}
          numberOfLines={numberOfLines}
          style={inputStyles}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.lightGreyText}
        />
      </View>
      {error && <Text style={styles.error}>Input field cannot be empty</Text>}
    </View>
  );
};

InputField.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  inputStyle: PropTypes.object,
  iconName: PropTypes.string,
  iconFill: PropTypes.string,
  iconSize: PropTypes.number,
  onChangeText: PropTypes.func,
  multiline: PropTypes.bool,
  numberOfLines: PropTypes.number,
  editable: PropTypes.bool,
  keyboardType: PropTypes.string,
  returnKeyType: PropTypes.string,
  testIdentifier: PropTypes.string
};

export default InputField;
