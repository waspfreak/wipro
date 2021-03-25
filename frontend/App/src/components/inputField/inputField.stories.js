import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../storybook/decorators';
import { View, StyleSheet } from 'react-native';

import { withKnobs, text } from '@storybook/addon-knobs';
import InputField from './InputField';

storiesOf('InputField', module)
  .addDecorator(BufferView)
  .addDecorator(withKnobs)
  .add(
    'Input Field',
    () => (
      <View style={styles.container}>
        <InputField
          placeholder={text('Placeholder', 'Input Placeholder')}
          label={text('Label', 'Input Label')}
        />
      </View>
    ),
    {
      notes:
        'A text input field allow users submit data in the system to be processed and validated on the back end.'
    }
  );

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
