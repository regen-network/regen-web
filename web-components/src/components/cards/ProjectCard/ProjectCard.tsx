import React from 'react';
import { Box, SxProps, Theme, useTheme } from '@mui/material';
import clsx from 'clsx';
import { useState } from 'react';

import { formatStandardInfo } from '../../../utils/format';
import BreadcrumbIcon from '../../icons/BreadcrumbIcon';
import ProjectPlaceInfo from '../../place/ProjectPlaceInfo';
import UserInfo, { User } from '../../user/UserInfo';
import MediaCard from '../MediaCard';
import { PurchaseDetails } from './ProjectCard.PurchaseDetails';
import { useProjectCardStyles } from './ProjectCard.styles';
import { PurchaseInfo } from './ProjectCard.types';
import { getAbbreviation } from './ProjectCard.utils';
import { Body, Subtitle } from '../../typography';
import { RegenTokenIcon } from '../../icons/RegenTokenIcon';
import OutlinedButton from '../../buttons/OutlinedButton';
import CurrentCreditsIcon from '../../icons/CurrentCreditsIcon';

export interface ProjectCardProps {
  name: string;
  imgSrc: string;
  place: string;
  area: number;
  areaUnit: string;
  registry?: User | null;
  tag?: string;
  onClick?: () => void;
  onButtonClick?: () => void;
  comingSoon?: boolean;
  purchaseInfo?: PurchaseInfo;
  href?: string;
  target?: string;
  imageStorageBaseUrl?: string;
  apiServerUrl?: string;
  sx?: SxProps<Theme>;
}

export function ProjectCard({
  name,
  imgSrc,
  place,
  area,
  areaUnit,
  registry,
  onClick,
  onButtonClick,
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
  const classes = useProjectCardStyles();

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
          {purchaseInfo.units && (
            <>
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
            </>
          )}
          {open && (
            <div className={classes.purchaseDetails}>
              {purchaseInfo?.creditClass?.standard && (
                <PurchaseDetails
                  title={`vintage id${serialNumber ? ' (serial number)' : ''}`}
                  info={
                    (serialNumber ||
                      purchaseInfo?.vintageId?.substring(0, 8)) ??
                    ''
                  }
                />
              )}
              {purchaseInfo?.vintagePeriod && (
                <PurchaseDetails
                  title="vintage period"
                  info={purchaseInfo.vintagePeriod}
                />
              )}
              {purchaseInfo?.creditClass && (
                <PurchaseDetails
                  url={purchaseInfo?.creditClass?.url}
                  title="credit class"
                  info={formatStandardInfo(purchaseInfo.creditClass)}
                />
              )}
              {purchaseInfo?.methodology && (
                <PurchaseDetails
                  url={purchaseInfo?.methodology.url}
                  title="methodology"
                  info={formatStandardInfo(purchaseInfo.methodology)}
                />
              )}
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
              {purchaseInfo?.sellInfo && (
                <>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 5,
                    }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Subtitle
                        size="xs"
                        mobileSize="xxs"
                        color="info.main"
                        sx={{ mb: 1, fontWeight: 800 }}
                      >
                        {'PRICE PER TON'}
                      </Subtitle>
                      <Box sx={{ display: 'flex' }}>
                        <RegenTokenIcon />
                        <Body
                          size="md"
                          mobileSize="sm"
                          sx={{
                            fontWeight: 700,
                            ml: 2,
                            color: 'primary.contrastText',
                          }}
                        >
                          {purchaseInfo.sellInfo.pricePerTon}
                        </Body>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Subtitle
                        size="xs"
                        mobileSize="xxs"
                        color="info.main"
                        sx={{ mb: 1, fontWeight: 800 }}
                      >
                        {'CREDITS AVAILABLE'}
                      </Subtitle>
                      <Body
                        size="md"
                        mobileSize="sm"
                        sx={{ fontWeight: 700, color: 'primary.contrastText' }}
                      >
                        {purchaseInfo.sellInfo.creditsAvailable}
                      </Body>
                    </Box>
                  </Box>
                  <OutlinedButton
                    onClick={onButtonClick}
                    size="small"
                    startIcon={
                      <CurrentCreditsIcon height="18px" width="18px" />
                    }
                    sx={{ width: '100%' }}
                  >
                    {'BUY ECOCREDITS'}
                  </OutlinedButton>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </MediaCard>
  );
}
