import { ReactNode, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { msg, useLingui } from '@lingui/react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { EDIT_PROJECT } from 'legacy-pages/ProjectEdit/ProjectEdit.constants';
import { SOLD_OUT_TOOLTIP } from 'legacy-pages/Projects/AllProjects/AllProjects.constants';
import { Buy1Event } from 'web-marketplace/src/lib/tracker/types';
import { useTracker } from 'web-marketplace/src/lib/tracker/useTracker';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import CurrentCreditsIcon from 'web-components/src/components/icons/CurrentCreditsIcon';
import EditIcon from 'web-components/src/components/icons/EditIcon';
import { StickyBar } from 'web-components/src/components/sticky-bar/StickyBar';
import InfoTooltip from 'web-components/src/components/tooltip/InfoTooltip';
import InfoTooltipWithIcon from 'web-components/src/components/tooltip/InfoTooltipWithIcon';
import { Label, Subtitle } from 'web-components/src/components/typography';

import {
  getProjectCardBodyTextMapping,
  getProjectCardButtonMapping,
} from 'lib/constants/shared.constants';
import { IS_REGEN } from 'lib/env';
import { useWallet } from 'lib/wallet/wallet';

import {
  BOOK_CALL,
  BUY_DISABLED_TOOLTIP,
} from './SellOrdersActionsBar.constants';
import { SellOrdersActionsBarCreatePostButton } from './SellOrdersActionsBar.CreatePostButton';

type Params = {
  isBuyButtonDisabled?: boolean;
  isCommunityCredit: boolean;
  onBookCallButtonClick: () => void;
  onBuyButtonClick?: () => void;
  onChainProjectId?: string | null;
  offChainProjectId?: string | null;
  projectName?: string;
  onChainCreditClassId?: string;
  creditClassName?: string;
  avgPricePerTonLabel?: string;
  avgPricePerTonTooltip?: string;
  isPrefinanceProject?: boolean | null;
  prefinancePrice?: string;
  isAdmin?: boolean;
  children?: ReactNode;
  isSoldOut?: boolean;
  onClickCreatePost?: () => void;
  isCreatePostButtonDisabled?: boolean;
  tooltipText?: string;
  isTerrasos?: boolean;
};

export const SellOrdersActionsBar = ({
  isBuyButtonDisabled,
  isCommunityCredit,
  onBookCallButtonClick,
  onBuyButtonClick,
  onChainProjectId,
  offChainProjectId,
  projectName,
  onChainCreditClassId,
  creditClassName,
  avgPricePerTonLabel,
  avgPricePerTonTooltip,
  isPrefinanceProject,
  prefinancePrice,
  isAdmin,
  children,
  isSoldOut,
  onClickCreatePost,
  isCreatePostButtonDisabled,
  tooltipText,
  isTerrasos,
}: Params): JSX.Element => {
  const { _ } = useLingui();
  const location = useLocation();
  const { track } = useTracker();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const { loginDisabled } = useWallet();
  const bodyTexts = useMemo(() => getProjectCardBodyTextMapping(_), [_]);
  const buttons = useMemo(() => getProjectCardButtonMapping(_), [_]);
  return (
    <StickyBar>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          width: '100%',
        }}
      >
        {isAdmin ? (
          <>
            {!loginDisabled &&
              onClickCreatePost &&
              (isCreatePostButtonDisabled && tooltipText ? (
                <InfoTooltip arrow title={tooltipText} placement="top">
                  <div>
                    <SellOrdersActionsBarCreatePostButton
                      onClickCreatePost={onClickCreatePost}
                      isCreatePostButtonDisabled={isCreatePostButtonDisabled}
                    />
                  </div>
                </InfoTooltip>
              ) : (
                <SellOrdersActionsBarCreatePostButton
                  onClickCreatePost={onClickCreatePost}
                  isCreatePostButtonDisabled={!!isCreatePostButtonDisabled}
                />
              ))}
            <ContainedButton
              onClick={() =>
                navigate(
                  `/project-pages/${
                    onChainProjectId ?? offChainProjectId
                  }/edit/basic-info`,
                )
              }
            >
              <EditIcon className="mr-10" sx={{ color: '#fff' }} />
              {_(EDIT_PROJECT)}
            </ContainedButton>
          </>
        ) : (
          <>
            {((!isPrefinanceProject && !isBuyButtonDisabled) || !isSoldOut) &&
              (prefinancePrice ||
                (avgPricePerTonLabel && !!onChainProjectId)) && (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    mr: { xs: 2, sm: 5 },
                    py: { xs: 1, sm: 1.25 },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Label size="xs" sx={{ color: 'info.main', mr: 1 }}>
                      {isPrefinanceProject
                        ? bodyTexts.price
                        : bodyTexts.avgPriceLabel}
                    </Label>
                    {!isPrefinanceProject && (
                      <InfoTooltipWithIcon
                        title={avgPricePerTonTooltip}
                        outlined
                        sx={{ width: 18, height: 18 }}
                      />
                    )}
                  </Box>
                  <Subtitle>{prefinancePrice ?? avgPricePerTonLabel}</Subtitle>
                </Box>
              )}
            {(!isCommunityCredit ||
              isTerrasos ||
              (!onChainProjectId && isPrefinanceProject)) && (
              <OutlinedButton
                onClick={onBookCallButtonClick}
                size={isMobile ? 'small' : 'medium'}
                sx={{
                  mr: { xs: 2, sm: 5 },
                  display: {
                    xs: isPrefinanceProject ? 'none' : 'block',
                    sm: 'block',
                  },
                }}
                className={
                  isPrefinanceProject ? buttons.prefinance.className : ''
                }
              >
                {_(BOOK_CALL)}
              </OutlinedButton>
            )}
            {IS_REGEN &&
              onBuyButtonClick &&
              !!onChainProjectId &&
              !!onChainCreditClassId && (
                <InfoTooltip
                  title={
                    isSoldOut
                      ? _(SOLD_OUT_TOOLTIP)
                      : isBuyButtonDisabled
                      ? _(BUY_DISABLED_TOOLTIP)
                      : ''
                  }
                  arrow
                  placement="top"
                >
                  <span>
                    <ContainedButton
                      startIcon={
                        <CurrentCreditsIcon height="18px" width="18px" />
                      }
                      onClick={() => {
                        track<Buy1Event>('buy1', {
                          url: location.pathname,
                          buttonLocation: 'stickyNav',
                          projectName,
                          projectId: onChainProjectId,
                          creditClassId: onChainCreditClassId,
                          creditClassName,
                        });
                        onBuyButtonClick();
                      }}
                      disabled={isBuyButtonDisabled}
                      sx={{
                        height: '100%',
                        backgroundImage:
                          'linear-gradient(197deg, rgba(var(--sc-gradient-lighter-gradient-500) / 1) 14.67%, rgba(var(--sc-gradient-lighter-gradient-300) / 1) 97.14%)',
                      }}
                    >
                      {isMobile ? _(msg`BUY`) : _(msg`BUY CREDITS`)}
                    </ContainedButton>
                  </span>
                </InfoTooltip>
              )}
          </>
        )}
        {children}
      </Box>
    </StickyBar>
  );
};
