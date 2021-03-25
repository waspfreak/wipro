import React from 'react';
import styles from './styles';
import PropTypes from 'prop-types';
import useStyles from './styles';
import classnames from 'classnames'

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
  large,
  wrapperStyle,
  icon,
  iconColor
}) => {

  const classes = useStyles()

  return (
      <button 
        onClick={onPress} 
        disabled={disabled}
        className={classnames(
          classes.default,
          wrapperStyle,
          large?classes.defaultLarge:null,
          secondary?classes.secondary:null,
          tertiary?classes.tertiary:null,
          red?classes.red:null,
          )}
      >
        <span styles={textStyle}>{title}</span>
        {icon && (
          <Icon
            name={icon}
            fill={iconColor}
            height={28}
            width={28}
            viewBox="0 0 28 28"
          />
        )}

    </button> 
    );
};

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  secondary: PropTypes.bool,
  tertiary: PropTypes.bool,
  red: PropTypes.bool,
  title: PropTypes.string,
  icon: PropTypes.string.isRequired,
  iconColor: PropTypes.string,
  large: PropTypes.bool,
  wrapperStyle: PropTypes.object,
  textStyle: PropTypes.object,
};

export default Button;
