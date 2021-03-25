import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../storybook/decorators';
import { View, StyleSheet } from 'react-native';

import { withKnobs, text } from '@storybook/addon-knobs';
import SimpleCard from './SimpleCard';

storiesOf('SimpleCard', module)
  .addDecorator(BufferView)
  .addDecorator(withKnobs)
  .add(
    'Simple Card',
    () => (
      <View style={styles.container}>
        <SimpleCard title={text('Title', 'Simple Card')} />
      </View>
    ),
    {
      notes:
        'Simple Card \n \n\n\n\n Card container can contain anything inside'
    }
  );

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
