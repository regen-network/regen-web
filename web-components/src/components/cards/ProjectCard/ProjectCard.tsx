import { useState } from 'react';
import { SxProps, Theme, useTheme } from '@mui/material';
import clsx from 'clsx';
import InfoTooltip from 'web-components/src/components/tooltip/InfoTooltip';
import { Track } from 'web-marketplace/src/lib/tracker/types';

import { ButtonType } from '../../../types/shared/buttonType';
import { formatStandardInfo } from '../../../utils/format';
import { cn } from '../../../utils/styles/cn';
import { BlockContent, SanityBlockContent } from '../../block-content';
import ContainedButton from '../../buttons/ContainedButton';
import BreadcrumbIcon from '../../icons/BreadcrumbIcon';
import { PrefinanceIcon } from '../../icons/PrefinanceIcon';
import ProjectPlaceInfo from '../../place/ProjectPlaceInfo';
import { Body, Label } from '../../typography';
import { Account, User } from '../../user/UserInfo';
import MediaCard, { MediaCardProps } from '../MediaCard/MediaCard';
import { ProjectCardButton } from './ProjectCard.Button';
import {
  AVG_PRICE_TOOLTIP,
  DEFAULT_BUY_BUTTON,
  PREFINANCE,
  PREFINANCE_BUTTON,
  PREFINANCE_PRICE_TOOLTIP,
  VIEW_PROJECT_BUTTON,
} from './ProjectCard.constants';
import { CreditPrice } from './ProjectCard.CreditPrice';
import { ProgramImageChildren } from './ProjectCard.ImageChildren';
import { PurchaseDetails } from './ProjectCard.PurchaseDetails';
import { useProjectCardStyles } from './ProjectCard.styles';
import { ProjectPrefinancing, PurchaseInfo } from './ProjectCard.types';
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
  onContainedButtonClick?: () => void;
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
  disabled?: boolean;
  program?: Account;
  button?: ButtonType;
  containedButton?: ButtonType;
  projectPrefinancing?: ProjectPrefinancing;
  offChain?: boolean;
  asAdmin?: boolean;
  adminPrompt?: SanityBlockContent;
  loginDisabled?: boolean;
  tooltipText?: string;
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
  onContainedButtonClick,
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
  program,
  button,
  containedButton,
  projectPrefinancing,
  offChain,
  asAdmin,
  adminPrompt,
  loginDisabled,
  tooltipText,
  ...mediaCardProps
}: ProjectCardProps): JSX.Element {
  const theme = useTheme();
  const { classes } = useProjectCardStyles();

  const isPrefinanceProject = projectPrefinancing?.isPrefinanceProject;
  const cardButton =
    button ??
    (isSoldOut
      ? VIEW_PROJECT_BUTTON
      : isPrefinanceProject
      ? PREFINANCE_BUTTON
      : offChain
      ? VIEW_PROJECT_BUTTON
      : DEFAULT_BUY_BUTTON);

  const {
    text: buttonText,
    startIcon: buttonStartIcon,
    className: buttonClassName,
  } = cardButton;
  const isButtonDisabled =
    cardButton?.disabled !== undefined
      ? cardButton?.disabled
      : !purchaseInfo?.sellInfo?.creditsAvailableForUser &&
        !projectPrefinancing?.isPrefinanceProject &&
        !offChain &&
        !isSoldOut;
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
      {isPrefinanceProject && (
        <div className="bg-purple-gradient rounded-r-[5px] flex items-center justify-center px-10 py-[3px] text-grey-0 absolute top-20 left-0">
          <PrefinanceIcon />
          <Label
            className="pl-10 font-extrabold uppercase"
            component="span"
            size="xxs"
          >
            {PREFINANCE}
          </Label>
        </div>
      )}
      {comingSoon && (
        <div className={classes.comingSoon}>
          <span className={classes.comingSoonText}>coming soon</span>
        </div>
      )}
      {(purchaseInfo || isPrefinanceProject || offChain) && (
        <div className={classes.separator} />
      )}
      {(purchaseInfo || hasButton || isPrefinanceProject) && (
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
                  className={cn(classes.icon, 'text-brand-400')}
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
                {!offChain || projectPrefinancing?.isPrefinanceProject ? (
                  <CreditPrice
                    priceTooltip={
                      isPrefinanceProject
                        ? PREFINANCE_PRICE_TOOLTIP
                        : AVG_PRICE_TOOLTIP
                    }
                    creditsTooltip={creditsTooltip}
                    isSoldOut={isSoldOut}
                    purchaseInfo={purchaseInfo}
                    sx={{ mb: 5 }}
                    projectPrefinancing={projectPrefinancing}
                  />
                ) : (
                  <div className="h-[68px]">
                    {adminPrompt && (
                      <Body
                        size="xs"
                        className="p-10 bg-grey-200 text-grey-500 rounded-[5px]"
                      >
                        <BlockContent content={adminPrompt} />
                      </Body>
                    )}
                  </div>
                )}
                <div className="flex gap-10">
                  {containedButton && onContainedButtonClick && (
                    <ContainedButton
                      size="small"
                      startIcon={containedButton.startIcon}
                      disabled={containedButton.disabled}
                      sx={{ width: '100%' }}
                      className={containedButton.className}
                      onClick={onContainedButtonClick}
                    >
                      {containedButton.text}
                    </ContainedButton>
                  )}
                  {((onButtonClick && !loginDisabled) || isPrefinanceProject || offChain) &&
                    (isButtonDisabled && tooltipText ? (
                      <InfoTooltip arrow title={tooltipText} placement="top">
                        <div className="inline-flex w-full">
                          <ProjectCardButton
                            id={id}
                            name={name}
                            creditClassId={creditClassId}
                            onClick={onClick}
                            onButtonClick={onButtonClick}
                            track={track}
                            pathname={pathname}
                            projectPrefinancing={projectPrefinancing}
                            offChain={offChain}
                            asAdmin={asAdmin}
                            isPrefinanceProject={isPrefinanceProject}
                            buttonText={buttonText}
                            buttonStartIcon={buttonStartIcon}
                            buttonClassName={buttonClassName}
                            isButtonDisabled={isButtonDisabled}
                            isSoldOut={isSoldOut}
                          />
                        </div>
                      </InfoTooltip>
                    ) : (
                      <ProjectCardButton
                        id={id}
                        name={name}
                        creditClassId={creditClassId}
                        onClick={onClick}
                        onButtonClick={onButtonClick}
                        track={track}
                        pathname={pathname}
                        projectPrefinancing={projectPrefinancing}
                        offChain={offChain}
                        asAdmin={asAdmin}
                        isPrefinanceProject={isPrefinanceProject}
                        buttonText={buttonText}
                        buttonStartIcon={buttonStartIcon}
                        buttonClassName={buttonClassName}
                        isButtonDisabled={isButtonDisabled}
                        isSoldOut={isSoldOut}
                      />
                    ))}
                </div>
              </>
            </div>
          )}
        </div>
      )}
    </MediaCard>
  );
}
