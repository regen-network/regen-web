import { SxProps, Theme } from '@mui/material';

import { ProjectPageIcon } from '../../icons/ProjectPageIcon';
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
    title = 'Create your first project';
    icon = (
      <ProjectPageIcon
        sx={theme => ({
          color: 'info.main',
          height: theme.spacing(14.75),
          width: theme.spacing(18.25),
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
