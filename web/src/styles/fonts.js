import colors from './colors'
/**
 * Full typography here: https://app.zeplin.io/project/5dee1deaca08c2092789dbcd/screen/5dee1ee047c09b0697a12aec
 * 
 * React Native equivilant: frontend/App/src/styles/fonts.js
 */
export const fonts = {
    Body: {
        fontSize: '17px',
        color: colors.black,
        fontFamily: 'Roboto',
        fontWeight:'300',
      },   
      BodyBold: {
        fontSize: '17px',
        color: colors.black,
        fontWeight:'400',
        fontFamily: 'Roboto'
      }, 
      Caption1:{
        fontFamily: 'Roboto',
        fontSize: '12px',
        fontWeight: '300',
        fontStyle: 'normal',
        lineHeight: '16px',
        letterSpacing: 0,
        color: colors.black
      }
}

export default fonts;