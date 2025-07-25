import { useCallback } from 'react';
import { useApolloClient } from '@apollo/client';
import { ProjectInfo } from '@regen-network/api/regen/ecocredit/v1/query';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import {
  ProjectByIdQuery,
  ProjectByOnChainIdQuery,
  ProjectPatch,
} from 'generated/graphql';
import { NestedPartial } from 'types/nested-partial';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { useAuth } from 'lib/auth/auth';
import {
  AnchoredProjectMetadataLD,
  ProjectMetadataLD,
} from 'lib/db/types/json-ld';
import { getProjectKey } from 'lib/queries/react-query/ecocredit/getProjectQuery/getProjectQuery.constants';
import { getProjectsByAdminKey } from 'lib/queries/react-query/ecocredit/getProjectsByAdmin/getProjectsByAdmin.constants';
import { getMetadataQuery } from 'lib/queries/react-query/registry-server/getMetadataQuery/getMetadataQuery';
import { getAccountProjectsByIdQueryKey } from 'lib/queries/react-query/registry-server/graphql/getAccountProjectsByIdQuery/getAccountProjectsByIdQuery.utils';
import { getProjectByIdQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectByIdQuery/getProjectByIdQuery';
import { getProjectByIdKey } from 'lib/queries/react-query/registry-server/graphql/getProjectByIdQuery/getProjectByIdQuery.constants';
import { getProjectByOnChainIdQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectByOnChainIdQuery/getProjectByOnChainIdQuery';
import { getProjectByOnChainIdKey } from 'lib/queries/react-query/registry-server/graphql/getProjectByOnChainIdQuery/getProjectByOnChainIdQuery.constants';

import { UseProjectEditSubmitParams } from 'pages/ProjectEdit/hooks/useProjectEditSubmit';
import { BasicInfoFormSchemaType } from 'components/organisms/BasicInfoForm/BasicInfoForm.schema';
import { DescriptionSchemaType } from 'components/organisms/DescriptionForm/DescriptionForm.schema';
import { LocationFormSchemaType } from 'components/organisms/LocationForm/LocationForm.schema';
import { MediaFormSchemaType } from 'components/organisms/MediaForm/MediaForm.schema';
import {
  getIsOnChainId,
  getIsUuid,
} from 'components/templates/ProjectDetails/ProjectDetails.utils';

import { useLedger } from '../../ledger';
import { useCreateOrUpdateProject } from './UseCreateOrUpdateProject';

export type OffChainProject =
  | ProjectByIdQuery['projectById']
  | ProjectByOnChainIdQuery['projectByOnChainId'];

interface Props {
  projectId?: string;
  isEdit?: boolean;
  projectEditSubmit: UseProjectEditSubmitParams;
  navigateNext: () => void;
  anchored?: boolean;
  onChainProject?: ProjectInfo;
}

export interface MetadataSubmitProps {
  values: Values;
  overwrite?: boolean;
  shouldNavigate?: boolean;
  projectPatch?: ProjectPatch;
  offChainProjectId?: string;
}

interface Res {
  offChainProject?: OffChainProject;
  metadata?: Partial<ProjectMetadataLD>;
  metadataReload: () => Promise<void>;
  metadataSubmit: (p: MetadataSubmitProps) => Promise<void>;
  loading: boolean;
}

type Values =
  | BasicInfoFormSchemaType
  | LocationFormSchemaType
  | DescriptionSchemaType
  | MediaFormSchemaType
  | Partial<ProjectMetadataLD>;

export const useProjectWithMetadata = ({
  projectId,
  isEdit,
  onChainProject,
  navigateNext,
  projectEditSubmit,
  anchored = true,
}: Props): Res => {
  let metadata: Partial<ProjectMetadataLD> | undefined;
  let offChainProject: OffChainProject | undefined;
  const graphqlClient = useApolloClient();
  const reactQueryClient = useQueryClient();
  const { queryClient } = useLedger();
  const { activeAccount } = useAuth();
  const [selectedLanguage] = useAtom(selectedLanguageAtom);

  const { createOrUpdateProject } = useCreateOrUpdateProject();
  const isOnChainId = getIsOnChainId(projectId);
  const isOffChainUuid = getIsUuid(projectId);

  // In project creation mode or off-chain project edit mode,
  // we query the off-chain project since there's no on-chain project yet.
  // In this case, the router param projectId is the off-chain project uuid.
  const createOrEditOffChain =
    !!projectId && (!isEdit || (isEdit && isOffChainUuid));
  const { data: projectByOffChainIdRes, isFetching: isFetchingProjectById } =
    useQuery(
      getProjectByIdQuery({
        client: graphqlClient,
        enabled: createOrEditOffChain,
        id: projectId,
        languageCode: selectedLanguage,
      }),
    );
  const projectById = projectByOffChainIdRes?.data?.projectById;

  if (createOrEditOffChain && projectById) {
    offChainProject = projectById;
    metadata = projectById.metadata;
  }

  // In on-chain project edit mode, we can query the on-chain (anchored) project metadata.
  // In this case, the router param projectId is the on-chain project id.
  const editOnChain = !!projectId && isEdit && isOnChainId;
  // Metadata
  const { data: anchoredMetadata, isFetching: isFetchingMetadata } = useQuery(
    getMetadataQuery({
      iri: onChainProject?.metadata,
      enabled:
        !!onChainProject?.metadata && editOnChain && anchored && !!queryClient,
      client: queryClient,
      languageCode: selectedLanguage,
    }),
  );
  const {
    data: projectByOnChainIdRes,
    isFetching: isFetchingProjectByOnChainId,
  } = useQuery(
    getProjectByOnChainIdQuery({
      client: graphqlClient,
      enabled: editOnChain,
      onChainId: projectId as string,
      languageCode: selectedLanguage,
    }),
  );

  // Select metadata
  if (editOnChain) {
    offChainProject = projectByOnChainIdRes?.data?.projectByOnChainId;
    if (anchored) {
      metadata = anchoredMetadata as AnchoredProjectMetadataLD | undefined;
    } else {
      metadata = offChainProject?.metadata;
    }
  }
  // Create Reload and Submit callbacks
  const metadataReload = useCallback(async (): Promise<void> => {
    await reactQueryClient.invalidateQueries({
      queryKey: getAccountProjectsByIdQueryKey({
        id: activeAccount?.id,
      }),
    });
    if (createOrEditOffChain) {
      await reactQueryClient.invalidateQueries({
        queryKey: getProjectByIdKey(projectId),
      });
    }
    if (editOnChain) {
      await reactQueryClient.invalidateQueries({
        queryKey: getProjectByOnChainIdKey(projectId, selectedLanguage),
      });
      await reactQueryClient.invalidateQueries({
        queryKey: getProjectsByAdminKey({ admin: onChainProject?.admin }),
      });
      await reactQueryClient.invalidateQueries({
        queryKey: getProjectKey(projectId),
      });
    }
  }, [
    reactQueryClient,
    activeAccount?.id,
    createOrEditOffChain,
    editOnChain,
    projectId,
    selectedLanguage,
    onChainProject?.admin,
  ]);

  const metadataSubmit = useCallback(
    async ({
      values,
      overwrite = false,
      shouldNavigate = true,
      projectPatch = {},
      offChainProjectId,
    }: MetadataSubmitProps): Promise<void> => {
      let newMetadata = values;
      if (!overwrite) {
        newMetadata = { ...metadata, ...values };
      }
      if (isEdit && anchored && !!onChainProject) {
        await projectEditSubmit(
          newMetadata as NestedPartial<ProjectMetadataLD>,
        );
      } else {
        await createOrUpdateProject({
          offChainProjectId: offChainProject?.id ?? offChainProjectId,
          projectPatch: { metadata: newMetadata, ...projectPatch },
        });

        !isEdit && shouldNavigate && navigateNext();
      }
      await metadataReload();
    },
    [
      metadata,
      isEdit,
      anchored,
      onChainProject,
      metadataReload,
      projectEditSubmit,
      createOrUpdateProject,
      offChainProject?.id,
      navigateNext,
    ],
  );
  return {
    offChainProject,
    metadata,
    metadataReload,
    metadataSubmit,
    loading:
      isFetchingProjectById ||
      isFetchingMetadata ||
      isFetchingProjectByOnChainId,
  };
};
