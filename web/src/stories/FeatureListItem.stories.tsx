import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import theme from '../theme';

import FeatureListItem from '../components/FeatureListItem';

// item, selected, toggleSelectThis, theme, openSaveEntryModal

export const item = {
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

storiesOf('FeatureListItem', module)
  .add('default', () => <FeatureListItem item={item} selected={false} theme={theme} {...actions} />)
  .add('selected', () => <FeatureListItem item={item} selected={true} theme={theme} {...actions} />);
