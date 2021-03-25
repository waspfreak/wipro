import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../styles';

export default StyleSheet.create({
  card: {
    shadowRadius: 1,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 1 },
    borderRadius: 8,
    backgroundColor: colors.white,
    width: 168,
    height: 140,
    padding: 10,
    paddingRight: 0,
    marginRight: 0,
    marginTop: 10,
    marginBottom: 10
  },
  title: {
    ...fonts.HeadlineBold,
    maxWidth: 168,
    marginBottom: 10
  },
  summary: {
    ...fonts.Footnote,
    paddingRight: 10,
    paddingBottom: 10
  },
  membersContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  members: {
    flexDirection: 'row'
  },
  topContainer: {
    flexDirection: 'row',
    alignContent: 'space-between'
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    maxHeight: 75
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  pingImage: {
    resizeMode: 'contain'
  }
});
