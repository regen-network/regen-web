import InfoIcon from '../icons/InfoIcon';
import InfoIconOutlined from '../icons/InfoIconOutlined';
import InfoTooltip from './InfoTooltip';

interface Props {
  title: string;
  outlined?: boolean;
}

export default function InfoTooltipWithIcon({
  title,
  outlined,
}: Props): JSX.Element {
  return (
    <InfoTooltip arrow placement="top" title={title}>
      <span>{outlined ? <InfoIconOutlined /> : <InfoIcon />}</span>
    </InfoTooltip>
  );
}
