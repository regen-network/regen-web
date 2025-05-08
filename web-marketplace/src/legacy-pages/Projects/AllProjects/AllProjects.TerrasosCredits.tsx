import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';

import InfoTooltip from 'web-components/src/components/tooltip/InfoTooltip';

import { NormalizeProject } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';

import {
  COMPLIANCE_MARKET_TOOLTIP,
  VOLUNTARY_MARKET_TOOLTIP,
} from './AllProjects.constants';

import hectaresLogo from 'assets/svgs/logos/hectares.svg';
import tebuLogo from 'assets/svgs/logos/tebu.svg';

type Props = {
  project: NormalizeProject;
  isVoluntaryProject: boolean;
  isComplianceProject: boolean;
  complianceCredits: number;
};

export const TerrasosCredits = ({
  project,
  isVoluntaryProject,
  isComplianceProject,
  complianceCredits,
}: Props) => {
  const { _ } = useLingui();

  return (
    <>
      {isVoluntaryProject && (
        <span className="flex items-center">
          <span className="leading-[145%]">
            {project.purchaseInfo?.sellInfo?.creditsAvailable ??
              project.projectPrefinancing?.estimatedIssuance ??
              '0'}
          </span>
          <InfoTooltip
            arrow
            placement="top"
            title={_(VOLUNTARY_MARKET_TOOLTIP)}
          >
            <img src={tebuLogo} alt="tebu" className="ml-3 w-[25px]" />
          </InfoTooltip>
        </span>
      )}
      {!isVoluntaryProject && isComplianceProject && (
        <span className="flex items-center">
          <span className="leading-[145%]">{complianceCredits}</span>
          <InfoTooltip
            arrow
            placement="top"
            title={_(COMPLIANCE_MARKET_TOOLTIP)}
          >
            <img
              src={hectaresLogo}
              alt={_(msg`hectares`)}
              className="ml-[3px]"
            />
          </InfoTooltip>
        </span>
      )}
    </>
  );
};
