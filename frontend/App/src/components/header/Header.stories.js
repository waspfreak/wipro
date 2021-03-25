import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../storybook/decorators';
import { View, StyleSheet, Text } from 'react-native';
import { withKnobs, text } from '@storybook/addon-knobs';
import Header from './Header';
import ButtonIcon from '../buttonIcon/ButtonIcon';


storiesOf('Header', module)
  .addDecorator(BufferView)
  .addDecorator(withKnobs)
  .add(
    'Top Navigation',
    () => (
      <View style={styles.container}>
        <Header
          title={text('Title', 'Label')}
          right={ <ButtonIcon          
            icon={text('Icon', 'More')}
            iconColor={text('Icon Color', 'white')}
            iconSizeWidth="22"
            iconSizeHeight="22"
          />}
          left={<ButtonIcon          
            icon='Close'
            iconColor='white'
            iconSizeWidth="24"
            iconSizeHeight="24"
            iconColor="#1b6ac9"
            color="transparent"
          />}
        />
      </View>
    ),
    {
      notes:
        'Top navigation:\n\n\n\n\nThe top navigation primarily provides contextual controls relevant to the active state of the screen. These controls vary throughout the experience to provide relevant, page or section wide functions\n\n\n use HeaderRight Container or HeaderLeft Container are optional'
    }
  );

const styles = StyleSheet.create({
  container: {
    width: '90%'
  }
});
