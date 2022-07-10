import { SxProps, Theme } from '@mui/material';
import { DashboardCreateCard } from 'web-components/lib/components/cards/DashboardCreateCard';
import { CreditClassIcon } from 'web-components/lib/components/icons/CreditClassIcon';

interface Props {
  sx?: SxProps<Theme>;
  onClick: () => void;
  isFirstProject?: boolean;
}

export const CreateCreditClassCard = ({
  sx = [],
  onClick,
  isFirstProject,
}: Props) => {
  let title;
  let icon;
  if (isFirstProject) {
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
    <DashboardCreateCard
      sx={sx}
      title={title}
      onClick={onClick}
      buttonText="+ create credit class"
      icon={icon}
    />
  );
};
