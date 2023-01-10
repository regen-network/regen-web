import { ProjectInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { useQuery } from '@tanstack/react-query';

import { ProjectByIdQuery, ProjectByOnChainIdQuery } from 'generated/graphql';
import { graphqlClient } from 'lib/clients/graphqlClient';
import { getProjectQuery } from 'lib/queries/react-query/ecocredit/getProjectQuery/getProjectQuery';
import { getMetadataQuery } from 'lib/queries/react-query/registry-server/getMetadataQuery/getMetadataQuery';
import { getProjectByIdQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectByIdQuery/getProjectByIdQuery';
import { getProjectByOnChainIdQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectByOnChainIdQuery/getProjectByOnChainIdQuery';

type OffChainProject =
  | ProjectByIdQuery['projectById']
  | ProjectByOnChainIdQuery['projectByOnChainId'];

interface Res {
  onChainProject?: ProjectInfo;
  offChainProject?: OffChainProject;
  metadata: any;
  // reload: () => void;
  // isLoading: boolean;
}

export const useProjectWithMetadata = (
  projectId?: string,
  isEdit?: boolean,
  unanchored: boolean = false,
): Res => {
  let metadata;
  let offChainProject: OffChainProject | undefined;

  // In project creation mode, we query the off-chain project since there's no on-chain project yet.
  // In this case, the router param projectId is the off-chain project uuid.
  const create = !!projectId && !isEdit;
  const { data: projectByIdRes } = useQuery(
    getProjectByIdQuery({
      client: graphqlClient,
      enabled: create,
      id: projectId as string,
    }),
  );
  const projectById = projectByIdRes?.data?.projectById;
  if (create && projectById) {
    offChainProject = projectById;
    metadata = projectById.metadata;
  }

  // In project edit mode, we can query the on-chain project.
  // In this case, the router param projectId is the on-chain project id.
  const edit = !!projectId && isEdit;
  const { data: projectRes } = useQuery(
    getProjectQuery({
      request: {
        projectId,
      },
      enabled: edit,
    }),
  );
  const project = projectRes?.project;
  // Metadata
  const { data: anchoredMetadata } = useQuery(
    getMetadataQuery({
      iri: project?.metadata,
      enabled: !!project?.metadata && edit && !unanchored,
    }),
  );
  const { data: projectByOnChainIdRes } = useQuery(
    getProjectByOnChainIdQuery({
      client: graphqlClient,
      enabled: edit,
      onChainId: projectId as string,
    }),
  );
  if (edit) {
    offChainProject = projectByOnChainIdRes?.data?.projectByOnChainId;
    if (unanchored) {
      metadata = offChainProject?.metadata;
    } else {
      metadata = anchoredMetadata;
    }
  }

  // Reload callback
  // const reloadBalances = useCallback((): void => {
  //   reactQueryClient.invalidateQueries({
  //     queryKey: balancesQuery.queryKey,
  //   });
  // }, [reactQueryClient, balancesQuery]);

  return {
    onChainProject: project,
    offChainProject,
    metadata,
  };
};
