import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../storybook/decorators';
import { View, StyleSheet, Text } from 'react-native';
import Fade from './Fade';
import { boolean, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

storiesOf('Fade', module)
  .addDecorator(BufferView)
  .add(
    'Fade Wrapper',
    () => (
      <View style={styles.container}>
        <Fade
          trigger={boolean('trigger', true)}
          duration={number('duration', 500)}
          onFadeComplete={action('fade-complete')}
        >
          <Text>Test Fade Component</Text>
        </Fade>
      </View>
    ),
    {
      notes: 'Simple wrapper to fade an element on screen. Wrapper the  element you need to fade with this component.'
    }
  );

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  }
});
