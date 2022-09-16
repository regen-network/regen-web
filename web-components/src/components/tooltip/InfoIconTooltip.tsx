import InfoIcon from '../icons/InfoIcon';
import InfoTooltip from './InfoTooltip';

interface Props {
  title: string;
}

export default function InfoIconTooltip({ title }: Props): JSX.Element {
  return (
    <InfoTooltip arrow placement="top" title={title}>
      <div>
        <InfoIcon />
      </div>
    </InfoTooltip>
  );
}
