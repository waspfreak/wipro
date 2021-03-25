import { StyleSheet, Platform } from 'react-native';
import { metrics, colors, fonts } from '../../styles/';

export default StyleSheet.create({
  Menu: {
    backgroundColor: 'white',
    top: 45,
    right: 10,
    borderRadius: 8,
    maxWidth: 350
  },
  shadowMenuContainer: {
    position: 'absolute',
    borderRadius: 4,
    opacity: 0,
    /* Shadow */
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.14,
        shadowRadius: 2
      },
      android: {
        elevation: 8
      }
    })
  },
  chevronTopRightMenu: {
    position: 'absolute',
    top: -12,
    right: -1,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 14,
    borderRightWidth: 14,
    borderBottomWidth: 19,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white'
  },
  chevronTopLeftMenu: {
    left: 10
  },
  menuItem: {
    width: metrics.deviceWidth * 0.9
  },
  textMenuItem: {
    ...fonts.Title3,
    width: '85%',
    paddingTop: 8
  },
  dividerMenuItem: {
    marginTop: 9,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: colors.midLightGrey
  },
  dividerMenuItemLast: {
    marginTop: 9,
    borderBottomWidth: 0
  },
  iconContainer: {
    paddingTop: 4,
    paddingRight: 10
  },
  itemContainer: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 0
  }
});
