import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { BufferView } from '../storybook/decorators';
import { View, StyleSheet } from 'react-native';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import InterfaceButton from './InterfaceButton';
import colors from '../../styles/colors';

storiesOf('InterfaceButton', module)
  .addDecorator(BufferView)
  .addDecorator(withKnobs)
  .add(
    'Interface Button',
    () => (
      <View style={styles.container}>
        <InterfaceButton
          onPress={action('button-clicked')}
          plus={boolean('Plus', false)}
          title={text('Title', 'Button Title')}
          subtitle={text('Subtitle', 'Subtitle button')}
          color={text('Color', colors.black)}
        />
      </View>
    ),
    {
      notes:
        'Interface Button: 2 Types, *Activity and *Plus defaults to Activity if plus is not provided.\n\n\n Colors: any\n\n\n Text: Title and Subtitle '
    }
  );

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
