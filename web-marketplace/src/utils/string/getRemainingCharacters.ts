const DEFAULT_CHAR_LIMIT = 160;

type Params = {
  value?: string;
  charLimit?: number;
};

export const getRemainingCharacters = ({
  value = '',
  charLimit = DEFAULT_CHAR_LIMIT,
}: Params) => {
  return (charLimit || Infinity) - ((value && value.length) || 0);
};
