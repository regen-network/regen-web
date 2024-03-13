import { MetadataForm } from 'components/organisms/MetadataForm/MetadataForm';

import { ShaclGraphByUriQuery } from '../../generated/graphql';
import { UseProjectMetadataSubmitReturn } from './hooks/useProjectMetadataSubmit';

type Props = {
  isVCS: boolean;
  submit: UseProjectMetadataSubmitReturn;
  metadata?: string;
  graphData?: ShaclGraphByUriQuery;
  onPrev?: () => void;
  creditClassId?: string;
};

export const ProjectMetadataSelectedForm = ({
  graphData,
  isVCS,
  metadata,
  submit,
  onPrev,
  creditClassId,
}: Props): JSX.Element => (
  // const isVCS = !!creditClassId && isVCSCreditClass(creditClassId);
  // isVCS ? (
  //   // TODO https://github.com/regen-network/regen-registry/issues/908
  //   // Temporarily using ProjectMetadataForm for all cases
  //   <Box sx={{ display: 'flex', justifyContent: 'center' }}>
  //     {'VCS metadata form not implemented yet'}
  //   </Box>
  // ) : (
  <MetadataForm
    onSubmit={submit}
    initialValues={{ metadata: metadata ?? '' }}
    graphData={graphData}
    creditClassId={creditClassId}
    onPrev={onPrev}
  />
);
// );
