const config = {
  environment: 'develop',
  deepLinkPrefix: 'otask://',
  customProviderSignIn: 'azuread',
  storybook: false,
  features: {
    topics: true
  },
  oauthSettings: {
    domain: 'onetaskexperimental-a.auth.eu-west-2.amazoncognito.com',
    scope: [
      'phone',
      'email',
      'profile',
      'openid',
      'aws.cognito.signin.user.admin'
    ],
    redirectSignIn: 'otask://start',
    redirectSignOut: 'otask://user',
    responseType: 'code'
  }
};

module.exports = config;
