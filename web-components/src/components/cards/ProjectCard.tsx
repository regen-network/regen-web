import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useTheme, Theme, SxProps } from '@mui/material';
import clsx from 'clsx';
import ReactHtmlParser from 'react-html-parser';

import MediaCard from './MediaCard';
import BreadcrumbIcon from '../icons/BreadcrumbIcon';
import ProjectPlaceInfo from '../place/ProjectPlaceInfo';
import UserInfo, { User } from '../user/UserInfo';
import { StandardInfo, formatStandardInfo } from '../../utils/format';
import { Body, Label } from '../typography';

interface Info extends StandardInfo {
  url?: string | null;
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
  projectType: string;
}

export interface ProjectCardProps {
  name: string;
  imgSrc: string;
  place: string;
  area: number;
  areaUnit: string;
  registry?: User | null;
  tag?: string;
  onClick?: () => void;
  comingSoon?: boolean;
  purchaseInfo?: PurchaseInfo;
  href?: string;
  target?: string;
  imageStorageBaseUrl?: string;
  apiServerUrl?: string;
  sx?: SxProps<Theme>;
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
    [theme.breakpoints.down('sm')]: {
      // marginTop: theme.spacing(4.5),
      marginRight: theme.spacing(4.5),
      marginLeft: theme.spacing(4.5),
    },
  },
  placeInfo: {
    flex: '1 0 auto',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(1.75, 5.25, 5.25),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1.75, 4.5, 5),
    },
  },
  userInfo: {
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(5.25)} ${theme.spacing(5.25)}`,
    },
    [theme.breakpoints.down('sm')]: {
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
    display: 'inline',
  },
  purchaseInfo: {
    paddingTop: theme.spacing(3.5),
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(5.25),
      marginLeft: theme.spacing(5.25),
      paddingBottom: theme.spacing(5.75),
    },
    [theme.breakpoints.down('sm')]: {
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

function PurchaseDetails({
  title,
  info,
  url,
}: {
  title: string;
  info: string;
  url?: string | null;
}): JSX.Element {
  const parsedInfo = ReactHtmlParser(info);
  return (
    <div>
      <Label color="info.dark" size="sm" mobileSize="sm">
        {title}:{' '}
      </Label>
      <Body size="sm" mobileSize="sm" display="inline">
        {url ? (
          <a href={url} target="_blank" rel="noopener noreferrer">
            {parsedInfo}»
          </a>
        ) : (
          parsedInfo
        )}
      </Body>
    </div>
  );
}

export default function ProjectCard({
  name,
  imgSrc,
  place,
  area,
  areaUnit,
  registry,
  onClick,
  tag,
  comingSoon = false,
  purchaseInfo,
  href,
  target,
  imageStorageBaseUrl,
  apiServerUrl,
  sx,
}: ProjectCardProps): JSX.Element {
  const theme = useTheme();
  const classes = useStyles();

  const [open, setOpen] = useState<boolean>(true);

  const serialNumber: string | undefined =
    purchaseInfo?.vintageMetadata?.['http://regen.network/serialNumber'];
  const additionalCertifications: string[] | undefined =
    purchaseInfo?.vintageMetadata?.[
      'http://regen.network/additionalCertifications'
    ]?.['@list'];

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
      sx={sx}
    >
      <div className={classes.placeInfo}>
        <ProjectPlaceInfo
          place={place}
          area={area}
          areaUnit={getAbbreviation(areaUnit)}
          smFontSize="0.8125rem"
          fontSize="0.75rem"
          color={theme.palette.primary.light}
        />
      </div>
      {comingSoon && (
        <div className={classes.comingSoon}>
          <span className={classes.comingSoonText}>coming soon</span>
        </div>
      )}
      {registry && <div className={classes.separator} />}
      {registry && (
        <div className={classes.userInfo}>
          <UserInfo user={registry} size="sm" titleComponent="subtitle" />
        </div>
      )}
      {purchaseInfo && <div className={classes.separator} />}
      {purchaseInfo && (
        <div className={classes.purchaseInfo}>
          <span className={classes.units}>
            {purchaseInfo.units} credits purchased
          </span>
          <span
            onClick={() => setOpen(!open)}
            className={clsx(classes.viewDetails, classes.details)}
          >
            <BreadcrumbIcon
              direction={open ? 'up' : 'down'}
              className={classes.icon}
            />{' '}
            view details
          </span>
          {open && (
            <div className={classes.purchaseDetails}>
              {purchaseInfo.creditClass.standard && (
                <PurchaseDetails
                  title={`vintage id${serialNumber ? ' (serial number)' : ''}`}
                  info={serialNumber || purchaseInfo.vintageId.substring(0, 8)}
                />
              )}
              <PurchaseDetails
                title="vintage period"
                info={purchaseInfo.vintagePeriod}
              />
              <PurchaseDetails
                url={purchaseInfo.creditClass.url}
                title="credit class"
                info={formatStandardInfo(purchaseInfo.creditClass)}
              />
              <PurchaseDetails
                url={purchaseInfo.methodology.url}
                title="methodology"
                info={formatStandardInfo(purchaseInfo.methodology)}
              />
              {purchaseInfo.projectType && (
                <PurchaseDetails
                  title="project type"
                  info={purchaseInfo.projectType}
                />
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
