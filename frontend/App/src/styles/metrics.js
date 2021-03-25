import { Dimensions } from 'react-native';

export const { width, height } = Dimensions.get('window');

export const metrics = {
  deviceWidth: width,
  deviceHeight: height
};

export default metrics;
