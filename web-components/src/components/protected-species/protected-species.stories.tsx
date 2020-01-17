import * as React from 'react';
import Item, { ItemProps } from 'web-components/lib/components/protected-species/Item';
import ProtectedSpecies, { ProtectedSpeciesProps } from 'web-components/lib/components/protected-species';

export default {
  title: 'Components|Protected Species',
  component: ProtectedSpecies,
};

const protectedSpeciesItem: ItemProps = {
  name: 'Melaleuca halmaturum',
  imgSrc: './melaleuca.png',
};

const species: ProtectedSpeciesProps = [
  protectedSpeciesItem,
  protectedSpeciesItem,
  protectedSpeciesItem,
  protectedSpeciesItem,
];

export const item = (): JSX.Element => (
  <Item name={protectedSpeciesItem.name} imgSrc={protectedSpeciesItem.imgSrc} />
);

export const protectedSpecies = (): JSX.Element => <ProtectedSpecies species={species} />;
