import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../styles';

export default StyleSheet.create({
  container: {
    paddingBottom: 10,
    paddingTop: 20
  },
  input: {
    ...fonts.Body,
    height: 44,
    borderColor: colors.lightGreyText,
    borderWidth: 1,
    paddingTop: 10,
    padding: 10,
    borderRadius: 4,
    width: '100%',
    zIndex: 0
  },
  label: {
    ...fonts.BodyBold,
    marginBottom: 11,
    paddingBottom: 11,
    color: colors.black
  },
  error: {
    ...fonts.Caption1,
    color: colors.red,
    paddingTop: 20
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 10
  },
  iconInputStyle: {
    paddingLeft: 40
  },
  iconContainer: {
    position: 'absolute',
    top: -5,
    left: 5,
    zIndex: 1
  }
});
