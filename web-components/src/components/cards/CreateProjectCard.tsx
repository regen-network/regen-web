import React from 'react';
import { SxProps } from '@mui/material';
import { Theme } from '@mui/material';

import Card from './Card';
import OutlinedButton from '../buttons/OutlinedButton';
import { Title } from '../typography/Title';
import { ProjectPageIcon } from '../icons/ProjectPageIcon';

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
  return (
    <Card
      className={className}
      sx={theme => ({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: theme.spacing(92.5),
        width: { xs: '100%', sm: theme.spacing(91.75) },
        background: 'info.light',
        p: { xs: 12, sm: 8, md: 12 },
      })}
    >
      <ProjectPageIcon
        sx={theme => ({
          color: 'info.main',
          height: theme.spacing(14.75),
          width: theme.spacing(18.25),
        })}
      />
      {isFirstProject && (
        <Title variant="h4" align="center">
          You have not created any projects yet
        </Title>
      )}
      <OutlinedButton sx={{ width: '100%' }} onClick={onClick}>
        {isFirstProject ? '+ create project' : 'add another project'}
      </OutlinedButton>
    </Card>
  );
};

export default CreateProjectCard;
