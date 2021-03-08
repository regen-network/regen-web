import * as React from 'react';
import Tooltip from 'web-components/lib/components/tooltip';
import { withKnobs, text } from '@storybook/addon-knobs';

export default {
  title: 'Components|Tooltip',
  component: Tooltip,
  decorators: [withKnobs],
  parameters: {
    fileName: __filename,
  },
};

export const mainTitle = (): JSX.Element => (
  <Tooltip title={text('title', 'tooltip content')} arrow placement="bottom">
    <div style={{ position: 'absolute', top: '14rem' }}>hover or touch me</div>
  </Tooltip>
);
