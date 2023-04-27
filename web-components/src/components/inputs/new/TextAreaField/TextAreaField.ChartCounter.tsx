import { Body } from '../../../typography';

type Props = {
  value?: string;
  charLimit?: number;
};

const DEFAULT_CHAR_LIMIT = 160;

export const TextAreaFieldChartCounter = ({
  value,
  charLimit = DEFAULT_CHAR_LIMIT,
}: Props) => {
  const charsLeft = (charLimit || Infinity) - ((value && value.length) || 0);

  return (
    <Body size="sm" sx={{ color: 'info.main', mt: 1, mb: { xs: 3, sm: 4 } }}>
      {`${charsLeft} character${charsLeft === 1 ? '' : 's'} remaining`}
    </Body>
  );
};
