import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../styles';

export default StyleSheet.create({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingVertical: 12,
    marginVertical: 10
  },
  thumb: {
    // width: 40,
    marginRight: 12,
    height: '100%',
    alignItems: 'center'
  },
  textContainer: {
    maxWidth: '80%',
    alignItems: 'flex-start'
  },
  counterContainer: {
    width: 25,
    height: 25,
    backgroundColor: colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    right: 10,
    borderRadius: 999999
  },
  counterText: {
    ...fonts.Caption1,
    color: colors.white,
    alignItems: 'center',
    alignSelf: 'center'
  },
  projectName: {
    ...fonts.Caption0
  },
  title: {
    ...fonts.HeadlineBold
  },
  subtitle: {
    ...fonts.Caption1,
    color: colors.midBrown
  },
  description: {
    ...fonts.Footnote,
    paddingTop: 5
  },
  notification: {
    backgroundColor: colors.green,
    borderRadius: 999999,
    width: 14,
    height: 14,
    borderWidth: 0,
    marginBottom: -5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end'
  }
});
