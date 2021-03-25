import React, { useEffect, useState } from 'react';
import { Platform, StatusBar, StyleSheet, View, Linking } from 'react-native';
import Button from './src/components/button/Button';
import config from './src/configs/config';
import AppNavigator from './src/navigation/AppNavigator';
import StoryBook from '../storybook';
import Amplify, { Hub } from 'aws-amplify';
import { withOAuth } from 'aws-amplify-react-native';
import * as WebBrowser from 'expo-web-browser';
import { GlobalReducer } from './src/stores/globalReducer';
import { StateProvider } from './src/stores/globalStore';
import { globalStyles, colors } from './src/styles';
import { oneTaskStoreInitialState } from './src/stores/initialGlobalState';
import Reactotron from '../ReactotronConfig';

if (__DEV__) {
  import('../ReactotronConfig.js').then(() => {
    console.log('Reactatron Configured');
  });
}
console.disableYellowBox = true;

const urlOpener = async (loadUrl, redirectUrl) => {
  if (!loadUrl || !redirectUrl) {
    return;
  }
  try {
    const { type, url } = await WebBrowser.openAuthSessionAsync(
      loadUrl,
      redirectUrl
    );

    if (type === 'success') {
      await WebBrowser.dismissBrowser();
      if (Platform.OS === 'ios') {
        return Linking.openURL(url);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

// TODO: remove this config and retrieve from backend shared aws-config

const awsmobile = {
  aws_project_region: 'eu-west-2',
  aws_cognito_user_pool_domain:
    'https://onetaskexperimental-a.auth.eu-west-2.amazoncognito.com',
  aws_cognito_identity_pool_id:
    'eu-west-2:3aa39235-3111-4255-b8fe-81540951ad9f',
  aws_cognito_region: 'eu-west-2',
  aws_user_pools_id: 'eu-west-2_WBFewCnYT',
  aws_user_pools_web_client_id: '5u7t3elebrmn1hqsba9khd5nip',
  oauth: {},
  aws_appsync_graphqlEndpoint:
    'https://zrsqht3qizdkdnmcutu5nqznna.appsync-api.eu-west-2.amazonaws.com/graphql',
  aws_appsync_region: 'eu-west-2',
  aws_appsync_authenticationType: 'API_KEY',
  aws_appsync_apiKey: 'da2-iwn37fx7gjazbiktqewfz6oc2q',
  aws_appsync_apiId: 'r5qabow4lnazxbkt3o5ltmqoga'
};

/* oauth configuration */
awsmobile.oauth = {
  ...config.oauthSettings,
  urlOpener: urlOpener
};

Amplify.configure(awsmobile);

const App = props => {
  const [state, setState] = useState({
    userStatus: false,
    storybook: config.storybook
  });

  Reactotron.onCustomCommand('storybook', async () => {
    setState({ ...state, storybook: !state.storybook });
  });

  /* Hub listens for withOAuth events */
  useEffect(
    () =>
      Hub.listen('auth', ({ payload: { event, data } }) => {
        console.log(event, data, `event,data`);
        switch (event) {
          case 'signIn':
            setState({ ...state, userStatus: false });
            break;
          case 'signOut':
            setState({ ...state, userStatus: false });
            break;
          case 'oAuthSignOut':
            setState({ ...state, userStatus: false });
            break;
          default:
            console.log('default event = ' + event);
        }
      }),
    [state, state.storybook]
  );

  const {
    oAuthUser: user,
    oAuthError: error,
    customProviderSignIn,
    signOut
  } = props;

  this.state = {
    ...oneTaskStoreInitialState,
    userStatus: state.userStatus || user != null,
    user: user,
    error: error,
    signOut,
    test: false
  };

  /* Run storybook or App depending on config value or reactatron switcher */

  if (state.storybook) {
    return <StoryBook />;
  } else {
    return (
      <View style={styles.appContainer}>
        {user ? (
          <StateProvider initialState={this.state} reducer={GlobalReducer}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator uriPrefix={config.deepLinkPrefix} />
            {/* <View style={styles.signOut}> */}
            {/* <Button title="Sign Out" tertiary onPress={signOut} /> */}
            {/* </View> */}
          </StateProvider>
        ) : (
          <View style={styles.signInContainer}>
            <Button
              title="Sign In"
              tertiary
              onPress={() => {
                customProviderSignIn(config.customProviderSignIn);
              }}
            />
          </View>
        )}
      </View>
    );
  }
};
const oneTaskApp = __DEV__ ? Reactotron.overlay(App) : App;
export default withOAuth(oneTaskApp);

const styles = StyleSheet.create({
  appContainer: {
    flex: 1
  },
  signInContainer: {
    ...globalStyles.container,
    paddingHorizontal: globalStyles.paddingHorizontal,
    backgroundColor: colors.offWhite,
    justifyContent: 'center',
    alignItems: 'center'
  },
  signOut: {
    position: 'absolute',
    top: 50,
    left: 20
  }
});
