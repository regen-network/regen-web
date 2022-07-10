import { SxProps, Theme } from '@mui/material';
import { DashboardCreateCard } from 'web-components/lib/components/cards/DashboardCreateCard';
import { ProjectPageIcon } from 'web-components/lib/components/icons/ProjectPageIcon';

interface Props {
  sx?: SxProps<Theme>;
  onClick: () => void;
  isFirstProject?: boolean;
}

export const CreateProjectCard = ({
  sx = [],
  onClick,
  isFirstProject,
}: Props) => {
  let title;
  let icon;
  if (!!isFirstProject) {
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
  return (
    <DashboardCreateCard
      sx={sx}
      title={title}
      onClick={onClick}
      buttonText="+ create project"
      icon={icon}
    />
  );
};
