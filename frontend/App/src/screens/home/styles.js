import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../styles';
import globalStyles from '../../styles/globalStyles';

export default StyleSheet.create({
  container: {
    ...globalStyles.container,
    backgroundColor: colors.offWhite,
    paddingHorizontal: globalStyles.paddingHorizontal
  },
  topicsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'space-between',
    marginRight: -7
  },
  item: {
    width: '50%'
  },
  titleContainer: {
    paddingBottom: 0,
    paddingTop: 10
  },
  title: {
    ...fonts.Title2Bold
  },
  scrollBarContainer: {
    flex: 1,
    marginBottom: 30
  },
  searchContainer: {
    marginTop: 50,
    width: '100%',
    flex: 1
  },
  inputStyle: {
    backgroundColor: colors.inputBackground,
    borderRadius: 8,
    borderWidth: 0,
    height: 50,
    width: '100%',
    color: colors.darkGrey
  },
  headerWrapperStyle: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0
  },
  imageContainer: {
    height: '100%',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollBar: {
    marginTop: 10
  }
});
