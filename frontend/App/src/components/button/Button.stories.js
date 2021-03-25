import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import Button from './Button';
import { BufferView } from '../storybook/decorators';
import { View, StyleSheet } from 'react-native';

import { withKnobs, text, boolean } from '@storybook/addon-knobs';

storiesOf('Button', module)
  .addDecorator(BufferView)
  .addDecorator(withKnobs)
  .add(
    'Basic Button',
    () => (
      <View style={styles.container}>
        <Button
          title={text('title', 'Button Title')}
          onPress={action('button-clicked')}
          disabled={boolean('Disabled', false)}
          primary={boolean('Primary', true)}
          secondary={boolean('Secondary', false)}
          tertiary={boolean('Tertiary', false)}
          red={boolean('red', false)}
          large={boolean('Large', false)}
          small={boolean('Small', false)}
          icon={text('icon', 'Arrow')}
        />
      </View>
    ),
    {
      notes:
        'Primary: The Primary button is used for actions where the button takes a forceful action.\n\n\n\nThe Secondary button is used as an alternative to the primary for the same action. The primary button is used for actions where the button takes a forceful action. \n\n\n\nTertiary Action buttons: These buttons are primarily used as a confirmation of broarder action, such as confirming a form or storing information.   '
    },
    { notes: { disabled: true } }
  );

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
