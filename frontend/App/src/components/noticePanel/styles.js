import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../styles';
import globalStyles from '../../styles/globalStyles';

export default StyleSheet.create({
  card: {
    shadowRadius: 1,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 1 },
    borderRadius: 8,
    backgroundColor: colors.white,
    padding: 10,
    paddingRight: 0,
    marginTop: 15,
    paddingHorizontal: globalStyles.paddingHorizontal,
    minWidth: '100%'
  },
  title: {
    ...fonts.HeadlineBold,

    marginBottom: 10
  },
  topContainer: {
    flexDirection: 'row',
    alignContent: 'space-between'
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  summary: {
    ...fonts.Footnote,
    paddingRight: 10,
    paddingBottom: 5
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 5
  },
  badge: {
    position: 'absolute',
    backgroundColor: colors.red,
    borderRadius: 999999,
    width: 14,
    height: 14,
    top: -7,
    left: -7
  }
});
