import * as React from 'react';
import Tooltip from 'web-components/lib/components/tooltip';
import InfoTooltip from 'web-components/lib/components/tooltip/InfoTooltip';
import { withKnobs, text } from '@storybook/addon-knobs';

export default {
  title: 'Components|Tooltip',
  component: Tooltip,
  decorators: [withKnobs],
};

export const mainTitle = (): JSX.Element => (
  <Tooltip title={text('title', 'tooltip content')} arrow placement="bottom">
    <div style={{ position: 'absolute', top: '14rem' }}>hover or touch me</div>
  </Tooltip>
);

export const info = (): JSX.Element => (
  <InfoTooltip title={text('title', 'tooltip content')} arrow placement="bottom">
    <div style={{ position: 'absolute', top: '14rem' }}>Smaller tooltip. hover or touch me</div>
  </InfoTooltip>
);
