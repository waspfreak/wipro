import { StyleSheet } from 'react-native';
import { colors } from '../../styles';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 999999,
    marginRight: 2
  },
  text: {
    fontSize: 12,
    textAlign: 'center'
  },
  plusMembersStyle: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 999999,
    borderColor: colors.midBrown,
    borderWidth: 1
  },
  doubleDigitMembers: {
    flex: 0.7
  },
  tripleDigitMembers: {
    flex: 0.9
  }
});
