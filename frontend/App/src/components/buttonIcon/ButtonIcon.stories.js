import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import ButtonIcon from './ButtonIcon';
import { BufferView } from '../storybook/decorators';
import { View, StyleSheet } from 'react-native';

import { withKnobs, text } from '@storybook/addon-knobs';

storiesOf('ButtonIcon', module)
  .addDecorator(BufferView)
  .addDecorator(withKnobs)
  .add(
    'Button Icon',
    () => (
      <View style={styles.container}>
        <ButtonIcon
          onPress={action('button-clicked')}
          pressColor={text('Press Color', 'black')}
          color={text('Button Color', 'green')}
          icon={text('Icon', 'More')}
          iconColor={text('Icon Color', 'white')}
          iconSizeWidth="22"
          iconSizeHeight="22"
        />
      </View>
    ),
    {
      notes: 'Icon Button:   Simple Icon Button used on header, can only show Icons and can change Background Color'
    }
  );

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
