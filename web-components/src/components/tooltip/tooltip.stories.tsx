import * as React from 'react';
import Tooltip from 'web-components/lib/components/tooltip';
import InfoTooltip from 'web-components/lib/components/tooltip/InfoTooltip';

export default {
  title: 'Tooltip',
  component: Tooltip,
};

export const mainTitle = (): JSX.Element => (
  <Tooltip title={'tooltip content'} arrow placement="bottom">
    <div style={{ position: 'absolute', top: '14rem' }}>hover or touch me</div>
  </Tooltip>
);

export const info = (): JSX.Element => (
  <InfoTooltip title={'tooltip content'} arrow placement="bottom">
    <div style={{ position: 'absolute', top: '14rem' }}>Smaller tooltip. hover or touch me</div>
  </InfoTooltip>
);
