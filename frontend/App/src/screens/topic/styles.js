import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../styles';

export default StyleSheet.create({
  mainContent: {
    paddingVertical: 20
  },
  topicContainer: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomColor: colors.border,
    borderBottomWidth: 1
  },
  title: {
    ...fonts.Title2Bold,
    paddingBottom: 6
  },
  description: {
    ...fonts.Headline
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 20,
    borderBottomColor: colors.border,
    borderBottomWidth: 1
  },
  activityContainer: {
    paddingVertical: 12,
    paddingHorizontal: 24
  },
  user: {
    paddingTop: 15
  },
  interfaceStyle: {
    width: 100,
    marginHorizontal: 10,
    marginBottom: 24
  }
});
