import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import globalStyles from '../../styles/globalStyles';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 50,
    flexDirection: 'row',
    minHeight: 20,
    minWidth: 146,
    paddingHorizontal: 32
  },
  content: {
    flexDirection: 'row'
  },
  icon: {
    marginLeft: 5
  },
  containerLarge: {
    width: '100%'
  },
  containerSmall: {
    minWidth: 63,
    paddingHorizontal: 16
  },
  containerDisabled: {
    backgroundColor: colors.lightGrey,
    borderWidth: 0
  },
  containerPrimary: {
    backgroundColor: colors.green,
    borderWidth: 1,
    borderColor: colors.green
  },
  containerSecondary: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.darkGrey
  },
  containerSecondaryRed: {
    backgroundColor: colors.redOpacity,
    borderWidth: 1,
    borderColor: colors.red
  },
  containerTertiary: {
    backgroundColor: colors.blue,
    borderWidth: 1,
    padding: 5,
    minHeight: 30,
    borderColor: colors.blue,
    minWidth: 60,
    paddingHorizontal: 12
  },
  text: {
    color: colors.white,
    alignSelf: 'center',
    fontSize: 17,
    ...globalStyles.Body
  },
  textDisabled: {
    color: colors.white
  },
  textSecondary: {
    color: colors.black
  },
  textSecondaryRed: {
    color: colors.red
  },
  textTertiary: {
    color: colors.white,
    fontSize: 15
  }
});
