import React from 'react';
import { useTheme, makeStyles, Theme } from '@material-ui/core/styles';
import MediaCard from './MediaCard';
import ProjectPlaceInfo from '../place/ProjectPlaceInfo';
import UserInfo, { User } from '../user/UserInfo';

export interface ProjectInfo {
  name: string;
  imgSrc: string;
  place: string;
  area: number;
  areaUnit: 'hectares' | 'acres';
  developer: User;
}

interface ProjectCardProps {
  project: ProjectInfo;
  tag?: string;
  onClick: () => void;
}

interface AreaUnits {
  hectares: string;
  acres: string;
}

const areaUnits: AreaUnits = {
  hectares: 'ha.',
  acres: 'a.',
};

const useStyles = makeStyles((theme: Theme) => ({
  separator: {
    border: '1px solid #D2D5D9',
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(6.25),
      marginBottom: theme.spacing(5.25),
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(4.5),
      marginBottom: theme.spacing(5),
    },
  },
}));

export default function ProjectCard({ project, onClick, tag }: ProjectCardProps): JSX.Element {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <MediaCard
      onClick={onClick}
      imgSrc={project.imgSrc}
      name={project.name}
      elevation={1}
      titleVariant="h3"
      borderRadius="10px"
      borderColor="#D2D5D9"
      tag={tag}
    >
      <ProjectPlaceInfo
        place={project.place}
        area={project.area}
        areaUnit={areaUnits[project.areaUnit]}
        smFontSize="0.8125rem"
        fontSize="0.75rem"
        color={theme.palette.primary.light}
      />
      <hr className={classes.separator} />
      <UserInfo user={project.developer} size="project" />
    </MediaCard>
  );
}
