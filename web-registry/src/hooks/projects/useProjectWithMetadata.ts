import { ProjectInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { useQuery } from '@tanstack/react-query';

import { ProjectByIdQuery, ProjectByOnChainIdQuery } from 'generated/graphql';
import { graphqlClient } from 'lib/clients/graphqlClient';
import { getMetadataQuery } from 'lib/queries/react-query/registry-server/getMetadataQuery/getMetadataQuery';
import { getProjectByIdQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectByIdQuery/getProjectByIdQuery';
import { getProjectByOnChainIdQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectByOnChainIdQuery/getProjectByOnChainIdQuery';

export type OffChainProject =
  | ProjectByIdQuery['projectById']
  | ProjectByOnChainIdQuery['projectByOnChainId'];

interface Props {
  projectId?: string;
  isEdit?: boolean;
  unanchored?: boolean;
  onChainProject?: ProjectInfo;
}

interface Res {
  offChainProject?: OffChainProject;
  metadata: any; // TODO update with proper type
  // reload: () => void;
  // isLoading: boolean;
}

export const useProjectWithMetadata = ({
  projectId,
  isEdit,
  onChainProject,
  unanchored = false,
}: Props): Res => {
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

  // In project edit mode, we can query the on-chain (anchored) project metadata.
  // In this case, the router param projectId is the on-chain project id.
  const edit = !!projectId && isEdit;
  // Metadata
  const { data: anchoredMetadata } = useQuery(
    getMetadataQuery({
      iri: onChainProject?.metadata,
      enabled: !!onChainProject?.metadata && edit && !unanchored,
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
    offChainProject,
    metadata,
  };
};
