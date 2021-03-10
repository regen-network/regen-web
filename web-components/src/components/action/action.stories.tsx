import * as React from 'react';
import Action from 'web-components/lib/components/action';
import { withKnobs, text } from '@storybook/addon-knobs';

export default {
  title: 'Components|Action',
  component: Action,
  decorators: [withKnobs],
};

const actionName: string = 'Reduce pest populations';
const actionSrc: string = '/pest.png';
const actionDescription: string = 'Monitor and reduce the population of foxes, cats, dingos/wild dogs.';

export const action = (): JSX.Element => (
  <Action
    name={text('name', actionName)}
    description={text('description', actionDescription)}
    imgSrc={text('imgSrc', actionSrc)}
  />
);
