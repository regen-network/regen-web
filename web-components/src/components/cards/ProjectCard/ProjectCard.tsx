import { useState } from 'react';
import { SxProps, Theme, useTheme } from '@mui/material';
import clsx from 'clsx';
import { PrefinanceTag } from 'web-components/src/components/PrefinanceTag/PrefinanceTag';
import InfoTooltip from 'web-components/src/components/tooltip/InfoTooltip';
import { Track } from 'web-marketplace/src/lib/tracker/types';

import { ButtonType } from '../../../types/shared/buttonType';
import { formatStandardInfo } from '../../../utils/format';
import { cn } from '../../../utils/styles/cn';
import { BlockContent, SanityBlockContent } from '../../block-content';
import ContainedButton from '../../buttons/ContainedButton';
import BreadcrumbIcon from '../../icons/BreadcrumbIcon';
import ProjectPlaceInfo from '../../place/ProjectPlaceInfo';
import { Body } from '../../typography';
import { Account, User } from '../../user/UserInfo';
import MediaCard, { MediaCardProps } from '../MediaCard/MediaCard';
import { ProjectCardButton } from './ProjectCard.Button';
import { CreditPrice } from './ProjectCard.CreditPrice';
import { ProgramImageChildren } from './ProjectCard.ImageChildren';
import { PurchaseDetails } from './ProjectCard.PurchaseDetails';
import { useProjectCardStyles } from './ProjectCard.styles';
import {
  ProjectCardBodyTextsMapping,
  ProjectCardButtonsMapping,
  ProjectCardTitlesMapping,
  ProjectPrefinancing,
  PurchaseInfo,
} from './ProjectCard.types';
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
  createPostTooltipText?: string;
  editProjectTooltipText?: string;
  bodyTexts: ProjectCardBodyTextsMapping;
  purchaseDetailsTitles: ProjectCardTitlesMapping;
  buttons: ProjectCardButtonsMapping;
  useProjectCardButton?: boolean;
  hasBottomCard?: boolean;
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
  createPostTooltipText,
  editProjectTooltipText,
  bodyTexts,
  purchaseDetailsTitles,
  buttons,
  useProjectCardButton = true,
  hasBottomCard = true,
  ...mediaCardProps
}: ProjectCardProps): JSX.Element {
  const theme = useTheme();
  const { classes } = useProjectCardStyles();

  const isPrefinanceProject = projectPrefinancing?.isPrefinanceProject;
  const cardButton =
    button ??
    (isSoldOut
      ? buttons.view
      : isPrefinanceProject
      ? buttons.prefinance
      : offChain
      ? buttons.view
      : buttons.default);

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

  const showTwoButons =
    containedButton &&
    onContainedButtonClick &&
    (onButtonClick || isPrefinanceProject || offChain);

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
        <PrefinanceTag
          bodyTexts={bodyTexts}
          classNames={{
            root: 'top-20 left-0',
            label: 'text-[10px]',
          }}
        />
      )}
      {comingSoon && (
        <div className={classes.comingSoon}>
          <span className={classes.comingSoonText}>{bodyTexts.comingSoon}</span>
        </div>
      )}
      {(purchaseInfo || isPrefinanceProject || offChain) && hasBottomCard && (
        <div className={classes.separator} />
      )}
      {(purchaseInfo || hasButton || isPrefinanceProject) && hasBottomCard && (
        <div className={classes.purchaseInfo}>
          {purchaseInfo?.units && (
            <>
              <span className={classes.units}>
                {purchaseInfo.units} {bodyTexts.creditsPurchased}
              </span>
              <span
                onClick={() => setOpen(!open)}
                className={clsx(classes.viewDetails, classes.details)}
              >
                <BreadcrumbIcon
                  direction={open ? 'up' : 'down'}
                  className={cn(classes.icon, 'text-brand-400')}
                />{' '}
                {bodyTexts.viewDetails}
              </span>
            </>
          )}
          {open && (
            <div className={classes.purchaseDetails}>
              {purchaseInfo?.creditClass?.standard && (
                <PurchaseDetails
                  title={
                    serialNumber
                      ? purchaseDetailsTitles.vintageIdWithSerial
                      : purchaseDetailsTitles.vintageId
                  }
                  info={
                    (serialNumber ||
                      purchaseInfo?.vintageId?.substring(0, 8)) ??
                    ''
                  }
                />
              )}
              {purchaseInfo?.vintagePeriod && (
                <PurchaseDetails
                  title={purchaseDetailsTitles.vintagePeriod}
                  info={purchaseInfo.vintagePeriod}
                />
              )}
              {purchaseInfo?.creditClass && (
                <PurchaseDetails
                  url={purchaseInfo?.creditClass?.url}
                  title={purchaseDetailsTitles.creditClass}
                  info={formatStandardInfo(purchaseInfo.creditClass)}
                />
              )}
              {purchaseInfo?.methodology && (
                <PurchaseDetails
                  url={purchaseInfo?.methodology.url}
                  title={purchaseDetailsTitles.methodology}
                  info={formatStandardInfo(purchaseInfo.methodology)}
                />
              )}
              {purchaseInfo?.projectType && (
                <PurchaseDetails
                  title={purchaseDetailsTitles.projectType}
                  info={purchaseInfo?.projectType}
                />
              )}
              {additionalCertifications && (
                <PurchaseDetails
                  title={purchaseDetailsTitles.additionalCertifications}
                  info={additionalCertifications.join(', ')}
                />
              )}
              <>
                {!offChain || projectPrefinancing?.isPrefinanceProject ? (
                  <CreditPrice
                    bodyTexts={bodyTexts}
                    priceTooltip={
                      isPrefinanceProject
                        ? bodyTexts.prefinancePriceTooltip
                        : bodyTexts.avgPriceTooltip
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
                <div
                  className={`grid gap-10 ${
                    showTwoButons ? 'grid-cols-2' : 'grid-cols-1'
                  }`}
                >
                  {containedButton &&
                    onContainedButtonClick &&
                    (containedButton.disabled && editProjectTooltipText ? (
                      <InfoTooltip
                        arrow
                        title={editProjectTooltipText}
                        placement="top"
                      >
                        <div>
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
                        </div>
                      </InfoTooltip>
                    ) : (
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
                    ))}
                  {(hasButton || isPrefinanceProject || offChain) &&
                    useProjectCardButton &&
                    (isButtonDisabled && createPostTooltipText ? (
                      <InfoTooltip
                        arrow
                        title={createPostTooltipText}
                        placement="top"
                      >
                        <div>
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
                            buttonClassName={cn(buttonClassName, 'h-full')}
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
