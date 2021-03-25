import { createUseStyles } from 'react-jss';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const useStyles = createUseStyles({
  default: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: `21px`,
    flexDirection: 'row',
    height: `32px`, 
    minWidth: `63px`,
    backgroundColor: colors.green,
    borderColor: colors.green,
    ...fonts.Caption1,
    color: colors.white, //override font color rule,
    padding: '0 16px',
    cursor:'pointer',
    '&:focus':{
      outline:'none'
    },
    '&:active':{
      backgroundColor:colors.darkGreen
    },
    '&:disabled':{
      opacity:'0.7'
    }
  },
  defaultLarge:{
    height:'42px',
    padding: '0 32px',
    ...fonts.Body,
    color: colors.white, //override font color rule,
  },
  secondary:{
    backgroundColor: colors.white,
    color:colors.black,
    borderColor: colors.black12,
    '&:active':{
      backgroundColor:colors.lightGreyText,
      
    },
  },
  tertiary:{
    backgroundColor: colors.blue,
    color:colors.white,
    borderColor: colors.blue,
    '&:active':{
      backgroundColor:colors.darckBlue,
      borderColor: colors.darkBlue,
    },
  },
  red:{
    backgroundColor: colors.redOpacity,
    color:colors.red,
    borderColor: colors.red,
    '&:active':{
      backgroundColor:colors.redOpacityDark,
      borderColor: colors.red,
    },
  }

});

export default useStyles;