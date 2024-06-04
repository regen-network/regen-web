import { useCallback } from 'react';
import { Feature, Point } from 'geojson';
import { useSetAtom } from 'jotai';

import { UseStateSetter } from 'web-components/src/types/react/useState';
import { uploadFile } from 'web-components/src/utils/s3';

import { errorBannerTextAtom } from 'lib/atoms/error.atoms';

import { useCreateOrUpdateProject } from 'hooks/projects/UseCreateOrUpdateProject';

type UseHandleUploadParams = {
  offChainProjectId?: string;
  apiServerUrl: string;
  setOffChainProjectId: UseStateSetter<string | undefined>;
  subFolder?: string;
};

export const useHandleUpload = ({
  offChainProjectId,
  apiServerUrl,
  setOffChainProjectId,
  subFolder = '',
}: UseHandleUploadParams) => {
  const { createOrUpdateProject } = useCreateOrUpdateProject();
  const setErrorBannerTextAtom = useSetAtom(errorBannerTextAtom);

  const handleUpload = useCallback(
    async (
      file: File,
    ): Promise<
      { url: string; location?: Feature<Point>; iri?: string } | undefined
    > => {
      let projectId = offChainProjectId;
      try {
        if (!offChainProjectId) {
          // Since there's no offChainProjectId, this can only create a new off-chain project (and not update an existing one).
          // We do this in case there's only an on-chain project and no off-chain project because
          // we need to have an off-chain project id in order to upload the file successfully.
          projectId = await createOrUpdateProject({
            offChainProjectId,
            projectPatch: { metadata: {} },
          });
        }
        if (projectId) {
          setOffChainProjectId(projectId);
          const uploaded = await uploadFile(
            file,
            `projects/${projectId}${subFolder}`,
            apiServerUrl,
          );
          return uploaded;
        } else {
          throw new Error('Cannot upload file without a project id');
        }
      } catch (e) {
        setErrorBannerTextAtom(String(e));
        throw new Error(String(e));
      }
    },
    [
      apiServerUrl,
      createOrUpdateProject,
      offChainProjectId,
      setErrorBannerTextAtom,
      setOffChainProjectId,
      subFolder,
    ],
  );
  return { handleUpload };
};
