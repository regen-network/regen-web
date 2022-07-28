import { ProjectMetadataForm } from '../../components/organisms/ProjectMetadataForm/ProjectMetadataForm';
import { ShaclGraphByUriQuery } from '../../generated/graphql';
import { ProjectMetadataLD } from '../../generated/json-ld';
import { useProjectMetadataSubmitReturnedType } from './hooks/useProjectMetadataSubmit';

type Props = {
  isVCS: boolean;
  submit: useProjectMetadataSubmitReturnedType;
  metadata?: Partial<ProjectMetadataLD>;
  graphData?: ShaclGraphByUriQuery;
  onNext?: () => void;
  onPrev?: () => void;
};

export const ProjectMetadataSelectedForm = ({
  graphData,
  isVCS,
  metadata,
  submit,
  onNext,
  onPrev,
}: Props): JSX.Element => (
  <ProjectMetadataForm
    submit={submit}
    initialValues={metadata}
    graphData={graphData}
    onNext={onNext}
    onPrev={onPrev}
  />
);
// );
