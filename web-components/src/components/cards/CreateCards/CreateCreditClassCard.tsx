import { SxProps, Theme } from '@mui/material';

import { CreditClassIcon } from '../../icons/CreditClassIcon';
import { CreateCard } from './CreateCard';

interface Props {
  sx?: SxProps<Theme>;
  onClick: () => void;
  isFirstCreditClass?: boolean;
  buttonText: string;
  emptyTitle: string;
}

export const CreateCreditClassCard = ({
  sx = [],
  onClick,
  isFirstCreditClass,
  buttonText,
  emptyTitle,
}: Props): JSX.Element => {
  let title;
  let icon;
  if (isFirstCreditClass) {
    title = emptyTitle;
    icon = (
      <CreditClassIcon
        sx={theme => ({
          color: 'info.main',
          height: theme.spacing(14.75),
          width: theme.spacing(18.25),
        })}
      />
    );
  }
  return (
    <CreateCard
      sx={sx}
      title={title}
      onClick={onClick}
      buttonText={buttonText}
      icon={icon}
    />
  );
};
