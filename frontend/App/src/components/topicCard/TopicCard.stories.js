import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../storybook/decorators';
import { View, StyleSheet } from 'react-native';
import TopicCard from './TopicCard';
import { text, array } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

storiesOf('TopicCard', module)
  .addDecorator(BufferView)
  .add(
    'TopicCard with initials',
    () => (
      <View style={styles.container}>
        <TopicCard
          title={text('title', 'Topic title')}
          description={text('description', 'Topic description goes here')}
          members={array('members array', [
            'Homer Simpson',
            'Barney Gumble',
            'Clancy Wigum',
            'Ned Flanders',
            'Nelson Muntz'
          ])}
          onPress={action('topic-clicked')}
        />
      </View>
    ),
    {
      notes: 'Notes on the card component'
    }
  );

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
