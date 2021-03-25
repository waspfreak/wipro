import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../styles';
import globalStyles from '../../styles/globalStyles';

export default StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 10,
    marginTop: 15,
    paddingHorizontal: globalStyles.paddingHorizontal,
    minWidth: '100%',
    backgroundColor: colors.redOpacity,
    borderWidth: 1,
    borderColor: colors.errorBackground,
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center'
  },
  title: {
    ...fonts.Title2,
    color: colors.blue,
    marginBottom: 10,
    textAlign: 'center'
  },
  message: {
    ...fonts.Footnote,
    paddingRight: 10,
    paddingBottom: 5,
    textAlign: 'center'
  }
});
