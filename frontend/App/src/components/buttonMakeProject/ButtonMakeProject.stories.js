import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { BufferView } from '../storybook/decorators';
import { View, StyleSheet } from 'react-native';
import { withKnobs, text } from '@storybook/addon-knobs';
import ButtonMakeProject from './ButtonMakeProject';

storiesOf('ButtonMakeProject', module)
  .addDecorator(BufferView)
  .addDecorator(withKnobs)
  .add(
    'Button Make Project',
    () => (
      <View style={styles.container}>
        <ButtonMakeProject
          onPress={action('button-clicked')}
          title={text('Title', 'Make a project')}
          subtitle={text(
            'Subtitle',
            'Use projects for anything you’re working on,  like a marketing, an new product launch, or a project for a client. '
          )}
          icon={text('Icon', 'Favorite')}
        />
      </View>
    ),
    {
      notes: 'Button Make Project: \n\n\nThis is a View works as a Button is located in "New Project or Team Screen" \n\n\n Is posible to add Icon, Title, description and Onpress.  '
    }
  );

const styles = StyleSheet.create({
  container: {
    width: '90%'
  }
});
