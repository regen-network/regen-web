import Tooltip from './';
import InfoTooltip from './InfoTooltip';
import InfoTooltipWithIcon from './InfoTooltipWithIcon';

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
    <div style={{ position: 'absolute', top: '14rem' }}>
      Smaller tooltip. hover or touch me
    </div>
  </InfoTooltip>
);

export const infoWithIcon = (): JSX.Element => (
  <div style={{ position: 'absolute', top: '14rem' }}>
    {/* {'Smaller tooltip. hover or touch me '} */}
    <InfoTooltipWithIcon title={'tooltip content'} />
    <InfoTooltipWithIcon title={'tooltip content'} outlined />
  </div>
);
