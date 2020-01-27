import * as React from 'react';
import Title from 'web-components/lib/components/title';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import { ThemeStyle } from '@material-ui/core/styles/createTypography';

interface Options {
  h1: ThemeStyle;
  h2: ThemeStyle;
  h3: ThemeStyle;
  h4: ThemeStyle;
  h5: ThemeStyle;
}

const options: Options = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
};

export default {
  title: 'Components|Title',
  component: Title,
  decorators: [withKnobs],
};

export const mainTitle = (): JSX.Element => <Title variant="h1">{text('title', 'Sheok Hill')}</Title>;

export const subtitle = (): JSX.Element => (
  <Title variant="h2">{text('title', 'Ecological Practices')}</Title>
);

export const title = (): JSX.Element => (
  <Title variant={select('variant', options, 'h1')}>{text('title', 'Ecological Practices')}</Title>
);
