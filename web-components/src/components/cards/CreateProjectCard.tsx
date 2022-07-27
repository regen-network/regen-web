import React from 'react';
import { SxProps, Theme, useTheme } from '@mui/material';

import OutlinedButton from '../buttons/OutlinedButton';
import { ProjectPageIcon } from '../icons/ProjectPageIcon';
import { Title } from '../typography/Title';
import Card from './Card';

interface CreateProjectCardProps {
  className?: string;
  sx?: SxProps<Theme>;
  onClick: () => void;
  isFirstProject: boolean;
}

const CreateProjectCard: React.FC<CreateProjectCardProps> = ({
  className,
  sx,
  onClick,
  isFirstProject,
}) => {
  const theme = useTheme();

  return (
    <Card
      className={className}
      sx={theme => ({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: { xs: theme.spacing(62.5), sm: theme.spacing(92.5) },
        backgroundColor: 'info.light',
        p: { xs: 12, sm: 8, md: 12 },
      })}
      borderRadius="10px"
      borderColor={theme.palette.grey[100]}
    >
      {isFirstProject && (
        <ProjectPageIcon
          sx={theme => ({
            color: 'info.main',
            height: theme.spacing(14.75),
            width: theme.spacing(18.25),
          })}
        />
      )}
      {isFirstProject && (
        <Title variant="h4" align="center">
          You have not created any projects yet
        </Title>
      )}
      <OutlinedButton sx={{ width: '100%' }} onClick={onClick}>
        + create project
      </OutlinedButton>
    </Card>
  );
};

export default CreateProjectCard;
