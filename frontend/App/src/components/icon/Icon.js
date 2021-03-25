import React from 'react';
import SvgIcon from 'react-native-svg-icon';
import icons from '../../assets/svgs/icons';

export const Icon = props => <SvgIcon {...props} svgs={icons} />;

Icon.defaultProps = {
  ...this.props,
  name: ''
};
export default Icon;
