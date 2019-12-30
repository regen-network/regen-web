import * as React from 'react';
import Title from 'web-components/lib/components/title';
import { muiTheme } from 'storybook-addon-material-ui';

// https://github.com/storybookjs/storybook/issues/7677
// export interface StoryMetadata {
//   component: React.ReactNode;
//   title: string;
//   decorators?: DecoratorFunction[];
// }
// const metadata: StoryMetadata = {
//   component: Event,
//   title: 'Event',
//   decorators: [
//     storyFn => <div style={{ backgroundColor: 'yellow' }}>{storyFn()}</div>,
//   ],
// };
//
// export default metadata;

export default {
  title: 'Components|Title',
  component: Title,
};

export const mainTitle = (): JSX.Element => (
  <Title size="h1">
    Sheok Hill
  </Title>
);

export const subtitle = (): JSX.Element => (
  <Title size="h2">
    Ecological Practices
  </Title>
);

export const whiteTitle = (): JSX.Element => (
  <Title color="primary" size="h1">
    Satellite Imagery
  </Title>
);
