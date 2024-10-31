import { useLingui } from '@lingui/react';

import InfoTooltip from 'web-components/src/components/tooltip/InfoTooltip';

import { NormalizeProject } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';

import {
  COMPLIANCE_MARKET_TOOLTIP,
  VOLUNTARY_MARKET_TOOLTIP,
} from './AllProjects.constants';

import hectaresLogo from 'assets/pngs/logos/hectares.png';
import tebuLogo from 'assets/svgs/logos/tebu.png';

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
      {!isVoluntaryProject && (
        <span className="flex items-center">
          {project.purchaseInfo?.sellInfo?.creditsAvailable ??
            project.projectPrefinancing?.estimatedIssuance ??
            '0'}
          <InfoTooltip
            arrow
            placement="top"
            title={_(VOLUNTARY_MARKET_TOOLTIP)}
          >
            <img src={tebuLogo} alt="tebu" className="ml-3" />
          </InfoTooltip>
        </span>
      )}
      {!isVoluntaryProject && isComplianceProject && (
        <span className="flex items-center">
          {complianceCredits}
          <InfoTooltip
            arrow
            placement="top"
            title={_(COMPLIANCE_MARKET_TOOLTIP)}
          >
            <img src={hectaresLogo} alt="hectares" className="ml-[3px]" />
          </InfoTooltip>
        </span>
      )}
    </>
  );
};
