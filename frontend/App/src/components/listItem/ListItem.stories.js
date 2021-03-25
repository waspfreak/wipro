import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { BufferView } from '../storybook/decorators';
import { View, StyleSheet } from 'react-native';
import { withKnobs, text } from '@storybook/addon-knobs';
import ListItem from './ListItem';
import colors from '../../styles/colors';

storiesOf('ListItem', module)
  .addDecorator(BufferView)
  .addDecorator(withKnobs)
  .add(
    'List Item',
    () => (
      <View style={styles.container}>
        <ListItem
          onPress={action('button-clicked')}
          title={text('Title', 'Add New Title for List')}
          user={text('User', 'Name Surname')}
          date={text('date', '28 Sep')}
          projectName={text('Project Name', 'Project Name ')}
          icon={text('Icon', 'Word')}
          color={text('Color', colors.green)}
          comments="5"
          description={text('Description', 'placeholder for this list... ')}
        />
      </View>
    ),
    {
      notes:
        'ListItem: \n\n\n\n\nPosible places to use: Home (Lasted Activity), Project User, MessagesBoard, Hey & Ping.\n\n\n\nThis component Show List Link with User Name, User Initial Icon, Icon Notification, title, description, date, comments counter  '
    }
  );

const styles = StyleSheet.create({
  container: {
    width: '90%'
  }
});
