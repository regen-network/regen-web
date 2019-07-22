import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import FeatureListItem, {Item} from 'components/FeatureListItem';

export const item: Item = {
  id: '1',
  geometry: {
        "type": "Polygon",
        "coordinates": [[
            [
              -83.94653320312499,
              9.67656858750112
            ],
            [
              -84.0399169921875,
              9.54929188384387
            ],
            [
              -83.78997802734375,
              9.419258059393734
            ],
            [
              -83.7103271484375,
              9.557417356841308
            ],
            [
              -83.94653320312499,
              9.67656858750112
            ]
          ]]
      },
};

export const actions = {
  toggleSelectThis: action('toggleSelectThis'),
  openSaveEntryModal: action('openSaveEntryModal'),
};

storiesOf('Components|Geo/FeatureListItem', module)
  .add('default', () => <FeatureListItem item={item} selected={false} {...actions} />)
  .add('selected', () => <FeatureListItem item={item} selected={true} {...actions} />);
