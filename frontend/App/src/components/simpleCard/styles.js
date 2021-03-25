import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import globalStyles from '../../styles/globalStyles';

export default StyleSheet.create({
  container: {
    shadowRadius: 1,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 1 },
    borderRadius: 8,
    backgroundColor: colors.white,
    width: 156,
    height: 156,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10
  },
  text: {
    ...globalStyles.BodyBold,
    marginVertical: 5,
    paddingTop: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1
  },
  textView: {
    borderBottomColor: 'rgba(0, 0, 0, 0.25) ',
    borderBottomWidth: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  textViewHide: {
    display: 'none',
    backgroundColor: 'red'
  }
});
