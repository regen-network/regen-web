import React, { useState } from 'react';
import { useTheme, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import ReactHtmlParser from 'react-html-parser';

import MediaCard from './MediaCard';
import BreadcrumbIcon from '../icons/BreadcrumbIcon';
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

interface Info {
  id: string;
  name?: string;
  version: string;
}

interface CreditClassInfo extends Info {
  standard: boolean;
}

interface PurchaseInfo {
  units: number;
  vintageId: string;
  vintageMetadata: any;
  vintagePeriod: string;
  creditClass: CreditClassInfo;
  methodology: Info;
  programGuide: Info;
  projectType: string;
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
  purchaseInfo?: PurchaseInfo;
  href?: string;
  target?: string;
  imageStorageBaseUrl?: string;
  apiServerUrl?: string;
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
  mediaCard: {
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(73),
    },
  },
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
  units: {
    fontSize: theme.spacing(3.5),
    fontWeight: 'bold',
    color: theme.palette.primary.light,
    lineHeight: '145%',
  },
  details: {
    fontWeight: 800,
    fontFamily: theme.typography.h1.fontFamily,
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  viewDetails: {
    color: theme.palette.secondary.main,
    lineHeight: theme.spacing(5),
    cursor: 'pointer',
    paddingLeft: theme.spacing(2.5),
  },
  detailsContent: {
    lineHeight: '150%',
    color: theme.palette.info.dark,
    fontSize: theme.spacing(3.5),
  },
  purchaseInfo: {
    paddingTop: theme.spacing(3.5),
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(5.25),
      marginLeft: theme.spacing(5.25),
      paddingBottom: theme.spacing(5.75),
    },
    [theme.breakpoints.down('xs')]: {
      marginRight: theme.spacing(4.5),
      marginLeft: theme.spacing(4.5),
      paddingBottom: theme.spacing(4),
    },
  },
  icon: {
    width: theme.spacing(2),
    height: theme.spacing(1.25),
  },
  purchaseDetails: {
    paddingTop: theme.spacing(2),
  },
}));

function PurchaseDetails({ title, info }: { title: string; info: string }): JSX.Element {
  const classes = useStyles();

  return (
    <div>
      <span className={clsx(classes.details, classes.detailsContent)}>{title}: </span>
      <span className={clsx(classes.detailsContent)}>{ReactHtmlParser(info)}</span>
    </div>
  );
}

function formatInfo(info: Info): string {
  return `${info.name ? `${info.name}, ` : ''}${info.id}, ${info.version}`;
}

function formatStandard(info: CreditClassInfo): string {
  return `${info.id} Standard ${info.version}`;
}

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
  purchaseInfo,
  href,
  target,
  imageStorageBaseUrl,
  apiServerUrl,
}: ProjectCardProps): JSX.Element {
  const theme = useTheme();
  const classes = useStyles();

  const [open, setOpen] = useState<boolean>(true);

  const serialNumber: string | undefined =
    purchaseInfo?.vintageMetadata?.['http://regen.network/serialNumber'];
  const additionalCertifications: string[] | undefined =
    purchaseInfo?.vintageMetadata?.['http://regen.network/additionalCertifications'];

  return (
    <MediaCard
      onClick={onClick}
      imgSrc={imgSrc}
      name={name}
      elevation={1}
      borderRadius="10px"
      borderColor={theme.palette.grey[100]}
      tag={tag}
      href={href}
      target={target}
      imageStorageBaseUrl={imageStorageBaseUrl}
      apiServerUrl={apiServerUrl}
      className={classes.mediaCard}
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
      {purchaseInfo && <div className={classes.separator} />}
      {purchaseInfo && (
        <div className={classes.purchaseInfo}>
          <span className={classes.units}>{purchaseInfo.units} credits purchased</span>
          <span onClick={() => setOpen(!open)} className={clsx(classes.viewDetails, classes.details)}>
            <BreadcrumbIcon direction={open ? 'up' : 'down'} className={classes.icon} /> view details
          </span>
          {open && (
            <div className={classes.purchaseDetails}>
              {purchaseInfo.creditClass.standard && (
                <PurchaseDetails
                  title={`vintage id${serialNumber ? ' (serial number)' : ''}`}
                  info={serialNumber || purchaseInfo.vintageId.substring(0, 8)}
                />
              )}
              <PurchaseDetails title="vintage period" info={purchaseInfo.vintagePeriod} />
              <PurchaseDetails
                title={`credit class${purchaseInfo.creditClass.standard ? ' (type)' : ''}`}
                info={
                  purchaseInfo.creditClass.standard && purchaseInfo.creditClass.name
                    ? purchaseInfo.creditClass.name
                    : formatInfo(purchaseInfo.creditClass)
                }
              />
              <PurchaseDetails title="methodology" info={formatInfo(purchaseInfo.methodology)} />
              {purchaseInfo.creditClass.standard ? (
                <PurchaseDetails title="standard" info={formatStandard(purchaseInfo.creditClass)} />
              ) : (
                <>
                  <PurchaseDetails title="program guide" info={formatInfo(purchaseInfo.programGuide)} />
                  <PurchaseDetails title="project type" info={purchaseInfo.projectType} />
                </>
              )}
              {additionalCertifications && (
                <PurchaseDetails
                  title="additional certifications"
                  info={additionalCertifications.join(', ')}
                />
              )}
            </div>
          )}
        </div>
      )}
    </MediaCard>
  );
}
