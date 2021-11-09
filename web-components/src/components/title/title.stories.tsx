import * as React from 'react';
import Title from 'web-components/lib/components/title';
// import { Variant } from '@material-ui/core/styles/createTypography';

// interface Options {
//   h1: Variant;
//   h2: Variant;
//   h3: Variant;
//   h4: Variant;
//   h5: Variant;
// }

// const options: Options = {
//   h1: 'h1',
//   h2: 'h2',
//   h3: 'h3',
//   h4: 'h4',
//   h5: 'h5',
// };

export default {
  title: 'Title',
  component: Title,
};

export const mainTitle = (): JSX.Element => (
  <Title variant="h1">{'Sheok Hill'}</Title>
);

export const subtitle = (): JSX.Element => (
  <Title variant="h2">{'Ecological Practices'}</Title>
);

// TODO select variant
// export const title = (): JSX.Element => (
//   <Title variant={'h1'}>{'Ecological Practices'}</Title>
// );
