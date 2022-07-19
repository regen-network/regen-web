import { SxProps, Theme } from '@mui/material';
import { CreateCard } from './CreateCard';
import { CreditClassIcon } from '../../icons/CreditClassIcon';

interface Props {
  sx?: SxProps<Theme>;
  onClick: () => void;
  isFirstCreditClass?: boolean;
}

export const CreateCreditClassCard = ({
  sx = [],
  onClick,
  isFirstCreditClass,
}: Props): JSX.Element => {
  let title;
  let icon;
  if (isFirstCreditClass) {
    title = 'You have not created any credit classes yet';
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
      buttonText="+ create credit class"
      icon={icon}
    />
  );
};
