import React from "react";
import styles from "./styles";
import PropTypes from "prop-types";
import useStyles from "./styles";
import classnames from "classnames";

import Icon from "../icon/Icon";

const ButtonIcon = ({
  onPress,
  icon,
  iconColor,
  iconSizeHeight,
  iconSizeWidth,
  color,
  testIdentifier,
  buttonColor
}) => {
  const classes = useStyles();

  return (
    <button
      onClick={onPress}
      className={classnames(classes.default, buttonColor)}
    >
      <span className={classes.icon}>
        <Icon
          icon={icon}
          color={iconColor}
          height={iconSizeHeight}
          width={iconSizeWidth}
          viewBox="0 0 28 28"
        />
      </span>
    </button>
  );
};

ButtonIcon.propTypes = {
  onPress: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  iconColor: PropTypes.string,
  buttonColor: PropTypes.object,
  iconSizeHeight: PropTypes.string,
  iconSizeWidth: PropTypes.string
};

export default ButtonIcon;
