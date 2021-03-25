import React from "react";
import PropTypes from "prop-types";
import icons from "./svgs/icons";

export const Icon = ({ viewBox, icon, height, width, color }) => (
  <svg width={width} height={height} fill={color}>
    <path d={icons[icon]}></path>
  </svg>
);

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string
};

Icon.defaultProps = {
  icon: "Close",
  viewBox: "0 0 24 24",
  width: "22",
  height: "22",
  color: "blue"
};
export default Icon;
