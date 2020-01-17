import * as React from 'react';
import Item from 'web-components/lib/components/protected-species/Item';

export default {
  title: 'Components|Protected Species',
  component: Item,
};

export const item = (): JSX.Element => <Item name="Melaleuca halmaturum" imgSrc="./melaleuca.png" />;
