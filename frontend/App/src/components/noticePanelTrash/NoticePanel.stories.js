import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../storybook/decorators';
import { View, StyleSheet } from 'react-native';
import NoticePanelTrash from './NoticePanelTrash';
import { text } from '@storybook/addon-knobs';
import { content } from '../../constants/Content';

storiesOf('NoticePanelTrash', module)
  .addDecorator(BufferView)
  .add(
    'NoticePanelTrash',
    () => (
      <View style={styles.container}>
        <NoticePanelTrash
          title={text('title', content.trash.title)}
          message={text('message', content.trash.message)}
        />
      </View>
    ),
    {
      notes: 'Simple panel to display messages on trash page'
    }
  );

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  }
});
