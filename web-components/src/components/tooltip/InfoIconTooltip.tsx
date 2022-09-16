import InfoIcon from '../icons/InfoIcon';
import InfoIconOutlined from '../icons/InfoIconOutlined';
import InfoTooltip from './InfoTooltip';

interface Props {
  title: string;
  outlined?: boolean;
}

export default function InfoIconTooltip({
  title,
  outlined,
}: Props): JSX.Element {
  return (
    <InfoTooltip arrow placement="top" title={title}>
      <div>{outlined ? <InfoIconOutlined /> : <InfoIcon />}</div>
    </InfoTooltip>
  );
}
