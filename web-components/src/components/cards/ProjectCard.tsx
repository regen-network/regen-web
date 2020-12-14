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

export interface ProjectCardProps {
  name: string;
  imgSrc: string;
  place: Place | string;
  area: number;
  areaUnit: string;
  developer?: User;
  tag?: string;
  onClick?: () => void;
  displayCity?: boolean;
  displayRegion?: boolean;
  displayCountry?: boolean;
  comingSoon?: boolean;
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
      return 'acres';
    default:
      return 'ha.';
  }
}

const useStyles = makeStyles((theme: Theme) => ({
  separator: {
    border: `0.5px solid ${theme.palette.grey[100]}`,
    [theme.breakpoints.up('sm')]: {
      // marginTop: theme.spacing(6.25),
      marginRight: theme.spacing(5.25),
      marginLeft: theme.spacing(5.25),
    },
    [theme.breakpoints.down('xs')]: {
      // marginTop: theme.spacing(4.5),
      marginRight: theme.spacing(4.5),
      marginLeft: theme.spacing(4.5),
    },
  },
  placeInfo: {
    flex: '1 0 auto',
    [theme.breakpoints.up('sm')]: {
      padding: `0 ${theme.spacing(5.25)} ${theme.spacing(5.25)}`,
    },
    [theme.breakpoints.down('xs')]: {
      padding: `0 ${theme.spacing(4.5)} ${theme.spacing(5)}`,
    },
  },
  userInfo: {
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(5.25)} ${theme.spacing(5.25)}`,
    },
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing(5.25)} ${theme.spacing(4.5)}`,
    },
  },
  comingSoon: {
    position: 'absolute',
    borderBottom: `${theme.spacing(5.75)} solid ${theme.palette.primary.main}`,
    borderLeft: `${theme.spacing(5.75)} solid transparent`,
    borderRight: `${theme.spacing(5.75)} solid transparent`,
    height: 0,
    width: theme.spacing(30.5),
    lineHeight: theme.spacing(5.75),
    opacity: 0.8,
    transform: 'rotate(45deg)',
    fontFamily: theme.typography.h1.fontFamily,
    fontWeight: 900,
    textAlign: 'center',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    color: theme.palette.info.dark,
    fontSize: theme.spacing(2.5),
    right: theme.spacing(-6.5),
    top: theme.spacing(5.75),
    whiteSpace: 'nowrap',
  },
  comingSoonText: {
    marginLeft: theme.spacing(-1),
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
  comingSoon = false,
}: ProjectCardProps): JSX.Element {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <MediaCard
      onClick={onClick}
      imgSrc={imgSrc}
      name={name}
      elevation={1}
      borderRadius="10px"
      borderColor={theme.palette.grey[100]}
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
      {comingSoon && (
        <div className={classes.comingSoon}>
          <span className={classes.comingSoonText}>coming soon</span>
        </div>
      )}
      {developer && <div className={classes.separator} />}
      {developer && (
        <div className={classes.userInfo}>
          <UserInfo user={developer} size="project" />
        </div>
      )}
    </MediaCard>
  );
}
