import React from 'react';
import { Box } from '@mui/system';

import { ProjectMetadataForm } from '../../components/organisms/ProjectMetadataForm/ProjectMetadataForm';
import { ShaclGraphByUriQuery } from '../../generated/graphql';
import { ProjectMetadataLD } from '../../generated/json-ld';
import { useProjectMetadataSubmitReturnedType } from './hooks/useProjectMetadataSubmit';

type Props = {
  isVCS: boolean;
  submit: useProjectMetadataSubmitReturnedType;
  metadata?: Partial<ProjectMetadataLD>;
  graphData?: ShaclGraphByUriQuery;
};

export const ProjectMetadataSelectedForm = ({
  graphData,
  isVCS,
  metadata,
  submit,
}: Props): JSX.Element =>
  isVCS ? (
    // TODO https://github.com/regen-network/regen-registry/issues/908
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      {'VCS metadata form not implemented yet'}
    </Box>
  ) : (
    <ProjectMetadataForm
      submit={submit}
      initialValues={metadata}
      graphData={graphData}
    />
  );
