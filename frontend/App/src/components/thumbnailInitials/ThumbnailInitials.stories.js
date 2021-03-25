import React from 'react';
import { storiesOf } from '@storybook/react-native';
import ThumbnailInitials from './ThumbnailInitials';
import { BufferView } from '../storybook/decorators';
import { View, StyleSheet } from 'react-native';

import { withKnobs, text, object, number } from '@storybook/addon-knobs';

storiesOf('ThumbnailInitials', module)
  .addDecorator(BufferView)
  .addDecorator(withKnobs)
  .add(
    'Thumbnail with initials',
    () => (
      <View style={styles.container}>
        <ThumbnailInitials
          name={text('name', 'Joe Blo')}
          size={number('size', 100)}
          style={object('style', {
            padding: 10
          })}
          extraMembers={number('extra members number', null)}
        />
      </View>
    ),
    {
      notes:
        'This component accepts a name prop as a string, takes first and last names and renders a circular thumbnail with initials. Handles multiple names. If the extraMembers prop (extra members number) is used, styling changes to the plus members styling.'
    }
  );

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
