import { StyleSheet } from 'react-native';
import { fonts, colors } from '../../styles/';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
  title: {
    ...fonts.SubheadlineBold
  },
  subtitle: {
    ...fonts.Caption0,
    color: colors.lightGreyText
  },
  buttonBackground: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    height: 72,
    width: 72
  },
  buttonBorder: {
    borderWidth: 3,
    backgroundColor: colors.white
  }
});
