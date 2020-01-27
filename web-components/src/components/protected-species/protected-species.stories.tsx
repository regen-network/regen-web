import * as React from 'react';
import Item, { ItemProps } from 'web-components/lib/components/protected-species/Item';
import ProtectedSpecies, { ProtectedSpeciesProps } from 'web-components/lib/components/protected-species';
import Grid from '@material-ui/core/Grid';
import { withKnobs, text, object } from '@storybook/addon-knobs';

export default {
  title: 'Components|Protected Species',
  component: ProtectedSpecies,
  decorators: [withKnobs],
};

const protectedSpeciesItem: ItemProps = {
  name: 'Melaleuca brevifolia',
  imgSrc: './melaleuca-b.png',
};

const species: ProtectedSpeciesProps = [
  protectedSpeciesItem,
  protectedSpeciesItem,
  protectedSpeciesItem,
  protectedSpeciesItem,
  protectedSpeciesItem,
  protectedSpeciesItem,
  protectedSpeciesItem,
  protectedSpeciesItem,
  protectedSpeciesItem,
  protectedSpeciesItem,
];

export const item = (): JSX.Element => (
  <Item name={text('Name', protectedSpeciesItem.name)} imgSrc={protectedSpeciesItem.imgSrc} />
);

export const protectedSpecies = (): JSX.Element => (
  <Grid container>
    <Grid item xs={12} sm={4}>
      <ProtectedSpecies species={object('Species', species)} />
    </Grid>
  </Grid>
);
