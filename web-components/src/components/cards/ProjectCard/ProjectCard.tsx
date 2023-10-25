import { useState } from 'react';
import { SxProps, Theme, useTheme } from '@mui/material';
import clsx from 'clsx';
import { Buy1Event, Track } from 'web-marketplace/src/lib/tracker/types';

import { ButtonType } from '../../../types/shared/buttonType';
import { formatStandardInfo } from '../../../utils/format';
import OutlinedButton from '../../buttons/OutlinedButton';
import BreadcrumbIcon from '../../icons/BreadcrumbIcon';
import ProjectPlaceInfo from '../../place/ProjectPlaceInfo';
import { Account, User } from '../../user/UserInfo';
import MediaCard, { MediaCardProps } from '../MediaCard';
import { AVG_PRICE_TOOLTIP, DEFAULT_BUY_BUTTON } from './ProjectCard.constants';
import { CreditPrice } from './ProjectCard.CreditPrice';
import { ProgramImageChildren } from './ProjectCard.ImageChildren';
import { PurchaseDetails } from './ProjectCard.PurchaseDetails';
import { useProjectCardStyles } from './ProjectCard.styles';
import { PurchaseInfo } from './ProjectCard.types';
import { getAbbreviation } from './ProjectCard.utils';

export interface ProjectCardProps extends MediaCardProps {
  id?: string;
  name: string;
  creditClassId?: string;
  imgSrc: string;
  place: string;
  area?: number;
  areaUnit?: string;
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
  track?: Track;
  pathname?: string;
  isSoldOut?: boolean;
  creditsTooltip?: string;
  button?: ButtonType;
  disabled?: boolean;
  program?: Account;
}

export function ProjectCard({
  id,
  name,
  creditClassId,
  imgSrc,
  place,
  area,
  areaUnit,
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
  track,
  isSoldOut = false,
  creditsTooltip,
  pathname,
  button = DEFAULT_BUY_BUTTON,
  program,
  ...mediaCardProps
}: ProjectCardProps): JSX.Element {
  const theme = useTheme();
  const { classes } = useProjectCardStyles();
  const { text: buttonText, startIcon: buttonStartIcon } = button;
  const isButtonDisabled =
    button?.disabled !== undefined
      ? button?.disabled
      : !purchaseInfo?.sellInfo?.creditsAvailableForUser;
  const hasButton = !!onButtonClick;

  const [open, setOpen] = useState<boolean>(true);

  const serialNumber: string | undefined =
    purchaseInfo?.vintageMetadata?.[
      'https://schema.regen.network#serialNumber'
    ];
  const additionalCertifications: string[] | undefined =
    purchaseInfo?.vintageMetadata?.[
      'https://schema.regen.network#additionalCertifications'
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
      sx={{ ...sx, height: '100%' }}
      imageChildren={<ProgramImageChildren program={program} />}
      {...mediaCardProps}
    >
      <div className={classes.placeInfo}>
        <ProjectPlaceInfo
          place={place}
          area={area}
          areaUnit={areaUnit ? getAbbreviation(areaUnit) : undefined}
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
      {purchaseInfo && <div className={classes.separator} />}
      {(purchaseInfo || hasButton) && (
        <div className={classes.purchaseInfo}>
          {purchaseInfo?.units && (
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
              {purchaseInfo?.projectType && (
                <PurchaseDetails
                  title="project type"
                  info={purchaseInfo?.projectType}
                />
              )}
              {additionalCertifications && (
                <PurchaseDetails
                  title="additional certifications"
                  info={additionalCertifications.join(', ')}
                />
              )}
              <>
                <CreditPrice
                  priceTooltip={AVG_PRICE_TOOLTIP}
                  creditsTooltip={creditsTooltip}
                  isSoldOut={isSoldOut}
                  purchaseInfo={purchaseInfo}
                  sx={{ mb: 5 }}
                />
                {onButtonClick && (
                  <OutlinedButton
                    onClick={event => {
                      event.stopPropagation();
                      track &&
                        track<'buy1', Buy1Event>('buy1', {
                          url: pathname ?? '',
                          cardType: 'project',
                          buttonLocation: 'projectCard',
                          projectName: name,
                          projectId: id,
                          creditClassId,
                        });
                      onButtonClick && onButtonClick();
                    }}
                    size="small"
                    startIcon={buttonStartIcon}
                    disabled={isButtonDisabled}
                    sx={{ width: '100%' }}
                  >
                    {buttonText}
                  </OutlinedButton>
                )}
              </>
            </div>
          )}
        </div>
      )}
    </MediaCard>
  );
}
