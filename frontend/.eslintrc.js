 module.exports = {
   'extends': ['@react-native-community', 'prettier'],
   'parser': 'babel-eslint',
   'plugins': ['detox'],
   'env': {
     'jest': true,
     'jasmine': true,
     'detox/detox':true
   },
   'rules': {
     'no-use-before-define': 'off',
     'react/jsx-filename-extension': 'off',
     'react/prop-types': 'off',
     'comma-dangle': 'off'
   },
   'globals': {
     "fetch": false
   }
 };
;