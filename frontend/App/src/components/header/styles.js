import { StyleSheet } from 'react-native';
import { fonts, colors } from '../../styles/';
export default StyleSheet.create({
  header: {
    height: 50,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderBottomColor: colors.border,
    borderBottomWidth: 1
  },
  leftContainer: {
    position: 'absolute',
    left: 0
  },
  rightContainer: {
    position: 'absolute',
    right: 0
  },
  title: {
    ...fonts.BodyBold
  }
});
