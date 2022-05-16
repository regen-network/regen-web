import * as React from 'react';
import Action from 'web-components/lib/components/action';

export default {
  title: 'Action',
  component: Action,
};

const actionName: string = 'Reduce pest populations';
const actionSrc: string = '/pest.png';
const actionDescription: string =
  'Monitor and reduce the population of foxes, cats, dingos/wild dogs.';

export const action = (): JSX.Element => (
  <Action
    name={actionName}
    description={actionDescription}
    imgSrc={actionSrc}
  />
);

export const actionLongDescription = (): JSX.Element => (
  <Action
    name={actionName}
    description={
      'Esse quis dolor mollit occaecat. Enim magna adipisicing ex sunt irure irure minim cupidatat aliquip adipisicing fugiat exercitation. Anim enim adipisicing nulla duis labore magna elit in. Fugiat nostrud sunt elit incididunt. Proident mollit reprehenderit nostrud occaecat non aute dolor do voluptate tempor in ut. Laboris cupidatat consequat commodo. Reprehenderit pariatur sint esse esse non esse adipisicing velit amet. Cupidatat est amet elit veniam ad. Proident occaecat est et ipsum dolor tempor amet dolore ut quis. Exercitation duis aliqua dolore veniam in.Esse quis dolor mollit occaecat. Enim magna adipisicing ex sunt irure irure minim cupidatat aliquip adipisicing fugiat exercitation. Anim enim adipisicing nulla duis labore magna elit in. Fugiat nostrud sunt elit incididunt. Proident mollit reprehenderit nostrud occaecat non aute dolor do voluptate tempor in ut. Laboris cupidatat consequat commodo. Reprehenderit pariatur sint esse esse non esse adipisicing velit amet. Cupidatat est amet elit veniam ad. Proident occaecat est et ipsum dolor tempor amet dolore ut quis. Exercitation duis aliqua dolore veniam in.'
    }
    imgSrc={actionSrc}
  />
);
