import { SxProps, Theme } from '@mui/material';

import { NoProjectIcon } from '../../icons/NoProjectIcon';
import { CreateCard } from './CreateCard';

interface Props {
  sx?: SxProps<Theme>;
  onClick: () => void;
  isFirstProject?: boolean;
  emptyTitle: string;
  buttonText: string;
}

function getCardData(
  emptyTitle: string,
  isFirstProject?: boolean,
): {
  title?: string;
  icon?: React.ReactElement;
} {
  let title, icon;
  if (isFirstProject) {
    title = emptyTitle;
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
  buttonText,
  emptyTitle,
}: Props): JSX.Element => {
  const { title, icon } = getCardData(emptyTitle, isFirstProject);
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
