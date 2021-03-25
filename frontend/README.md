# OneTask React Native App

This is the ReactNative application for OneTask.

## Getting Started

Follow the instructions in the [README file in the root of the project](../README.md).

## Run App

In the frontend directory, make sure you have installed dependencies by running:

```bash
yarn install
```

To run the app you need to run the metro bundler and having it running.  You also need XCODE installed.  To start the bundler use:

```bash
yarn start
```
To install dependencies you may need to run the following command in the ios folder

```bash
pod install
```

To run IOS open XCODE and hit the Run. Alternatively you can run this command and it will be done for you.

```bash
yarn ios
```



## Run StoryBook

```bash
yarn storybook
```

### Running the storybook in the simulator and devices

App/src/config/config.js => flag 'storybook' to true

restart the bundler and storybook will run

Alternatively, by running 'Reactatron' with the simulator you can easily toggle
between the app and storybook but clicking on 'Custom Commands' -> 'storybook'

You can then view notes, change props, trigger actions for components

Snapshots for components run as part of the jest unit tests ```yarn test```
They are included in the coverage report

**When add new story component need stop and run the server again

## Reactatron debugger
Reactatron is a standalone desktop app that helps with debugging the app.
Simply run the app and reacatron together and these features are available:
- toggle between storybook and app
- overlay designs over app for greater design accuracy
- api and network stack
- store/state tracking

## Running the tests

### Unit Tests

```bash
yarn test
```

### Run coverage report

```bash
yarn coverage
```

### E2E Mobile Tests
1) Just for the first time:
```
brew tap wix/brew
brew install applesimutils
```

2) Build the app `yarn pre-e2e-ios`
3) Run end-to-end ios mobile tests `yarn e2e-ios`
