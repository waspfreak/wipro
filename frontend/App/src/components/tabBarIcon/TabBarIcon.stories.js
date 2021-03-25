import React from 'react';
import { storiesOf } from '@storybook/react-native';
import TabBarIcon from './TabBarIcon';
import { BufferView } from '../storybook/decorators';

storiesOf('TabBarIcon', module)
  .addDecorator(BufferView)
  .add('Focused', () => <TabBarIcon name="Home" focused />)
  .add('Not Focused', () => <TabBarIcon name="Home" focused={false} />);
