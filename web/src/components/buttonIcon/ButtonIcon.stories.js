import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ButtonIcon from './ButtonIcon';

import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import StoryContainer from '../storyContainer/StoryContainer';


storiesOf('ButtonIcon', module)
  .addDecorator(withKnobs)
  .add(
    'Button Icon',
    () => (
      <ButtonIcon
        onPress={action('button-clicked')}
        icon={text('icon', 'Arrow')}
        buttonColor="green"
      />
    ),
    {
      notes:
        '\n '
    },
    { notes: { disabled: true } }
  );

