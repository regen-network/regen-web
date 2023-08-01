import { SxProps, Theme } from '@mui/material';

import { NoProjectIcon } from '../../icons/NoProjectIcon';
import { CreateCard } from './CreateCard';

interface Props {
  sx?: SxProps<Theme>;
  onClick: () => void;
  isFirstProject?: boolean;
}

function getCardData(isFirstProject?: boolean): {
  title?: string;
  icon?: React.ReactElement;
} {
  let title, icon;
  if (isFirstProject) {
    title = 'You have not created any projects yet';
    icon = (
      <NoProjectIcon
        sx={theme => ({
          height: theme.spacing(25.25),
          width: theme.spacing(25.25),
        })}
      />
    );
  }
  return { title, icon };
}

export const CreateProjectCard = ({
  sx = [],
  onClick,
  isFirstProject,
}: Props): JSX.Element => {
  const { title, icon } = getCardData(isFirstProject);
  return (
    <CreateCard
      sx={sx}
      title={title}
      onClick={onClick}
      buttonText="+ create project"
      icon={icon}
    />
  );
};
