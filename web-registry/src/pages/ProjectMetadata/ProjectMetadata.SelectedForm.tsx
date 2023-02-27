import React from 'react';

import { ProjectMetadataLD } from 'lib/db/types/json-ld';

import { ProjectMetadataForm } from '../../components/organisms/ProjectMetadataForm/ProjectMetadataForm';
import { ShaclGraphByUriQuery } from '../../generated/graphql';
import { UseProjectMetadataSubmitReturn } from './hooks/useProjectMetadataSubmit';

type Props = {
  isVCS: boolean;
  submit: UseProjectMetadataSubmitReturn;
  metadata?: Partial<ProjectMetadataLD>;
  graphData?: ShaclGraphByUriQuery;
  onNext?: () => void;
  onPrev?: () => void;
  creditClassId?: string;
};

export const ProjectMetadataSelectedForm = ({
  graphData,
  isVCS,
  metadata,
  submit,
  onNext,
  onPrev,
  creditClassId,
}: Props): JSX.Element => (
  // isVCS ? (
  //   // TODO https://github.com/regen-network/regen-registry/issues/908
  //   // Temporarily using ProjectMetadataForm for all cases
  //   <Box sx={{ display: 'flex', justifyContent: 'center' }}>
  //     {'VCS metadata form not implemented yet'}
  //   </Box>
  // ) : (
  <ProjectMetadataForm
    submit={submit}
    initialValues={metadata}
    graphData={graphData}
    creditClassId={creditClassId}
    onNext={onNext}
    onPrev={onPrev}
  />
);
// );
