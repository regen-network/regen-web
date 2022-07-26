import { useTheme } from '@mui/styles';
import { Box, Skeleton } from '@mui/material';
import { useParams } from 'react-router-dom';
import { ServiceClientImpl } from '@regen-network/api/lib/generated/cosmos/tx/v1beta1/service';

import { Theme } from 'web-components/lib/theme/muiTheme';
import IssuanceModal from 'web-components/lib/components/modal/IssuanceModal';
import ProjectMedia from 'web-components/lib/components/sliders/ProjectMedia';
import SEO from 'web-components/lib/components/seo';
import { CreditPrice } from 'web-components/lib/components/fixed-footer/BuyFooter';

import { useLedger } from '../../../ledger';
import { chainId } from '../../../lib/ledger';
import {
  ProjectTopSection,
  ProjectImpactSection,
  MoreProjectsSection,
} from '../../organisms';
import { Credits } from '../../organisms/BuyCreditsModal/BuyCreditsModal';
import { useProjectByHandleQuery } from '../../../generated/graphql';
import { ProjectMetadataLD } from '../../../generated/json-ld/index';
import useOtherProjects from './hooks/useOtherProjects';
import useImpact from './hooks/useImpact';
import useSeo from './hooks/useSeo';
import useGeojson from './hooks/useGeojson';
import useMedia from './hooks/useMedia';
import useIssuanceModal from './hooks/useIssuanceModal';
import useBatches from './hooks/useBatches';
import { MoreInfo } from './ProjectDetails.MoreInfo';
import { ProjectTimeline } from './ProjectDetails.ProjectTimeline';
import { ProjectDocumentation } from './ProjectDetails.ProjectDocumentation';
import { TransactionModals } from './ProjectDetails.TransactionModals';
import { ManagementActions } from './ProjectDetails.ManagementActions';
import { getMediaBoxStyles } from './ProjectDetails.styles';

interface Project {
  creditPrice?: CreditPrice;
  stripePrice?: string;
  credits?: Credits;
}

// Update for testing purchase credits modal
const testProject: Project = {};

function ProjectDetails(): JSX.Element {
  const theme = useTheme<Theme>();

  const { projectId } = useParams();

  // Page mode (info/Tx)
  const isInfoMode = !(chainId && testProject.creditPrice);
  const isTxMode =
    chainId && (testProject.creditPrice || testProject.stripePrice);

  // Tx client
  const { api } = useLedger({ forceExp: true });
  let txClient: ServiceClientImpl | undefined;
  if (api) {
    txClient = new ServiceClientImpl(api.queryClient);
  }

  // fetch project by handle
  const { data, loading } = useProjectByHandleQuery({
    skip: !projectId,
    variables: { handle: projectId as string },
  });
  const project = data?.projectByHandle;

  // or fetch project by onChainId: TODO

  // from project.metadata
  const metadata: ProjectMetadataLD = project?.metadata;
  const vcsProjectId = metadata?.['regen:vcsProjectId'];
  const managementActions =
    metadata?.['regen:landManagementActions']?.['@list'];

  const creditClassId = project?.creditClassByCreditClassId?.onChainId;
  const { batchData, batchTotals } = useBatches({
    creditClassId,
    vcsProjectId,
  });

  // with project query
  const projectEvents = project?.eventsByProjectId?.nodes;
  const projectDocs = project?.documentsByProjectId?.nodes;

  const creditClassVersion =
    project?.creditClassByCreditClassId?.creditClassVersionsById?.nodes?.[0];

  const creditClassName = creditClassVersion?.name;
  const creditClassDenom =
    creditClassVersion?.metadata?.['http://regen.network/creditDenom'];
  const coBenefitsIris =
    creditClassVersion?.metadata?.['http://regen.network/coBenefits']?.[
      '@list'
    ]?.map((impact: { '@id': string }) => impact['@id']) || [];
  const primaryImpactIRI = [
    creditClassVersion?.metadata?.['http://regen.network/indicator']?.['@id'],
  ];

  //
  const { geojson, isGISFile, setGeojson } = useGeojson(metadata);

  const seoData = useSeo({
    metadata,
    creditClassName,
    // metadataLocation,
    handleReset: () => setGeojson(null),
  });
  const mediaData = useMedia({ metadata, geojson });
  const impactData = useImpact({ coBenefitsIris, primaryImpactIRI });
  const otherProjects = useOtherProjects(projectId as string);

  const {
    issuanceModalData,
    issuanceModalOpen,
    setIssuanceModalOpen,
    viewOnLedger,
  } = useIssuanceModal(data);

  return (
    <Box sx={{ backgroundColor: 'primary.main' }}>
      <SEO
        location={seoData.location}
        siteMetadata={seoData.siteMetadata}
        title={seoData.title}
        imageUrl={seoData.imageUrl}
      />

      {mediaData.assets.length === 0 && loading && (
        <Box sx={getMediaBoxStyles(theme)}>
          <Skeleton height={theme.spacing(78.75)} />
        </Box>
      )}

      {mediaData.assets.length > 0 && (
        <Box sx={getMediaBoxStyles(theme)}>
          <ProjectMedia
            gridView
            assets={mediaData.assets}
            apiServerUrl={mediaData.apiServerUrl}
            imageStorageBaseUrl={mediaData.imageStorageBaseUrl}
            imageCredits={mediaData.imageCredits}
            mobileHeight={theme.spacing(78.75)}
          />
        </Box>
      )}

      <ProjectTopSection
        data={data}
        batchData={{
          batches: batchData,
          totals: batchTotals,
        }}
        geojson={geojson}
        isGISFile={isGISFile}
      />

      {impactData && (
        <div className="topo-background-alternate">
          <ProjectImpactSection impact={impactData} />
        </div>
      )}

      {projectDocs && projectDocs.length > 0 && (
        <ProjectDocumentation
          docs={projectDocs}
          txClient={txClient}
          viewOnLedger={viewOnLedger}
        />
      )}

      {managementActions && <ManagementActions actions={managementActions} />}

      {projectEvents && projectEvents?.length > 0 && (
        <ProjectTimeline
          events={projectEvents}
          txClient={txClient}
          viewOnLedger={viewOnLedger}
        />
      )}

      {otherProjects && otherProjects.length > 0 && (
        <div className="topo-background-alternate">
          <MoreProjectsSection projects={otherProjects} />
        </div>
      )}

      {issuanceModalData && (
        <IssuanceModal
          txClient={txClient}
          open={issuanceModalOpen}
          onClose={() => setIssuanceModalOpen(false)}
          {...issuanceModalData}
        />
      )}

      {isInfoMode && <MoreInfo />}

      {isTxMode && (
        <TransactionModals
          metadata={metadata}
          projectId={projectId}
          testProject={testProject}
          creditDenom={creditClassDenom || creditClassName}
        />
      )}
    </Box>
  );
}

export { ProjectDetails };
