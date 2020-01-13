import * as React from 'react';
import Action from 'web-components/lib/components/action';

export default {
  title: 'Components|Action',
  component: Action,
};

const ActionName: string = 'Reduce pest populations';
const ActionSrc: string = '/pest.png';
const ActionDescription: string = 'Monitor and reduce the population of foxes, cats, dingos/wild dogs.';

export const action = (): JSX.Element => (
  <Action name={ActionName} description={ActionDescription} imgSrc={ActionSrc} />
);
