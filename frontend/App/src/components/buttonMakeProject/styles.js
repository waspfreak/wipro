import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../styles';

export default StyleSheet.create({
  container: {
    width: '90%',
    height: 201,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderColor: colors.border,
    borderWidth: 1,
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: 5,
    textAlign: 'center'
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 99999,
    backgroundColor: colors.purple,
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 14,
    marginBottom: 9,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  title: {
    ...fonts.Title3Bold,
    marginBottom: 10
  },
  subtitle: {
    ...fonts.Caption0,
    textAlign: 'center',
    lineHeight: 18
  }
});
