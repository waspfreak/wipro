import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../storybook/decorators';
import { View, StyleSheet } from 'react-native';
import NoticePanel from './NoticePanel';
import { text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

storiesOf('NoticePanel', module)
  .addDecorator(BufferView)
  .add(
    'NoticePanel',
    () => (
      <View style={styles.container}>
        <NoticePanel
          title={text('title', 'Notice header')}
          message={text(
            'message',
            'Message here is very important Message here is very important Message here is very important Message here is very important Message here is very important Message here is very important'
          )}
          onPress={action('topic-close-clicked')}
        />
      </View>
    ),
    {
      notes: 'Simple panel to display messages on a page'
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
