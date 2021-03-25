import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import globalStyles from '../../styles/globalStyles';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconContainer: {
    backgroundColor: colors.red
  },
  titleContainer: {},
  title: {
    ...globalStyles.SubheadlineBold
  }
});
