import React from 'react';
import { useTheme, makeStyles, Theme } from '@material-ui/core/styles';
import MediaCard from './MediaCard';
import ProjectPlaceInfo, { Place } from '../place/ProjectPlaceInfo';
import UserInfo, { User } from '../user/UserInfo';

export interface ProjectInfo {
  name: string;
  imgSrc: string;
  place: string;
  area: number;
  areaUnit: string;
  developer: User;
}

interface ProjectCardProps {
  name: string;
  imgSrc: string;
  place: Place;
  area: number;
  areaUnit: string;
  developer: User;
  tag?: string;
  onClick?: () => void;
  displayCity?: boolean;
  displayRegion?: boolean;
  displayCountry?: boolean;
}

interface AreaUnits {
  hectares: string;
  acres: string;
}

function getAbbreviation(unit: string): string {
  switch (unit) {
    case 'hectares':
      return 'ha.';
    case 'acres':
      return 'a.';
    default:
      return 'ha.';
  }
}

const useStyles = makeStyles((theme: Theme) => ({
  separator: {
    border: `0.5px solid ${theme.palette.grey[50]}`,
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(6.25),
      marginBottom: theme.spacing(5.25),
      marginRight: theme.spacing(5.25),
      marginLeft: theme.spacing(5.25),
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(4.5),
      marginBottom: theme.spacing(5),
      marginRight: theme.spacing(4.5),
      marginLeft: theme.spacing(4.5),
    },
  },
  placeInfo: {
    flex: '1 0 auto',
    [theme.breakpoints.up('sm')]: {
      padding: `0 ${theme.spacing(5.25)}`,
    },
    [theme.breakpoints.down('xs')]: {
      padding: `0 ${theme.spacing(4.5)}`,
    },
  },
  userInfo: {
    [theme.breakpoints.up('sm')]: {
      padding: `0 ${theme.spacing(5.25)} ${theme.spacing(5.25)}`,
    },
    [theme.breakpoints.down('xs')]: {
      padding: `0 ${theme.spacing(4.5)} ${theme.spacing(5.25)}`,
    },
  },
}));

export default function ProjectCard({
  name,
  imgSrc,
  place,
  area,
  areaUnit,
  developer,
  onClick,
  tag,
  displayCity = true,
  displayRegion = true,
  displayCountry = true,
}: ProjectCardProps): JSX.Element {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <MediaCard
      onClick={onClick}
      imgSrc={imgSrc}
      name={name}
      elevation={1}
      titleVariant="h3"
      borderRadius="10px"
      borderColor={theme.palette.grey[50]}
      tag={tag}
    >
      <div className={classes.placeInfo}>
        <ProjectPlaceInfo
          place={place}
          area={area}
          areaUnit={getAbbreviation(areaUnit)}
          smFontSize="0.8125rem"
          fontSize="0.75rem"
          color={theme.palette.primary.light}
          displayCity={displayCity}
          displayRegion={displayRegion}
          displayCountry={displayCountry}
        />
      </div>
      <div className={classes.separator} />
      <div className={classes.userInfo}>
        <UserInfo user={developer} size="project" />
      </div>
    </MediaCard>
  );
}
