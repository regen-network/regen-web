import * as React from 'react';
import Action from 'web-components/lib/components/action';

export default {
  title: 'Action',
  component: Action,
};

const actionName: string = 'Reduce pest populations';
const actionSrc: string = '/pest.png';
const actionDescription: string = 'Monitor and reduce the population of foxes, cats, dingos/wild dogs.';

export const action = (): JSX.Element => (
  <Action name={actionName} description={actionDescription} imgSrc={actionSrc} />
);
