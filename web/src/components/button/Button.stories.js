import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from './Button';

import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import StoryContainer from '../storyContainer/StoryContainer';


storiesOf('Button', module)
  .addDecorator(withKnobs)
  .add(
    'Button',
    () => (
      <Button
        title={text('title', 'Button Title')}
        onPress={action('button-clicked')}
        disabled={boolean('Disabled', false)}
        primary={boolean('Default', true)}
        secondary={boolean('Secondary', false)}
        tertiary={boolean('Tertiary', false)}
        red={boolean('red', false)}
        large={boolean('Large', false)}
        icon={text('icon', 'Arrow')}
      />
    ),
    {
      notes:
        'Primary: The Primary button is used for actions where the button takes a forceful action.\n \n\n\n\n The Secondary button is used as an alternative to the primary for the same action. The primary button is used for actions where the button takes a forceful action.  \n\n https://app.zeplin.io/project/5dee1deaca08c2092789dbcd/screen/5dee1ee0364ef10940cd0a00'
    },
    { notes: { disabled: true } }
  );

