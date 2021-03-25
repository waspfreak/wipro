const backend = require('genesis');
backend.configureAmplify('./node_modules/genesis/', {
  provider: './amplify/',
  exports: './App/src/',
  graphql: './App/src/graphql/'
});
