import { FormikHelpers } from 'formik';
import { useCallback } from 'react';
import { ProjectMetadataValues } from '../ProjectMetadataForm';

type Props = {
  isEdit?: boolean;
  confirmSave?: () => void;
  submit: (values: ProjectMetadataValues) => void;
};

type ReturnType = (
  values: ProjectMetadataValues,
  { setSubmitting, setTouched }: FormikHelpers<ProjectMetadataValues>,
) => Promise<void>;

const useProjectMetadataFormSubmit = ({
  isEdit,
  confirmSave,
  submit,
}: Props): ReturnType => {
  const onSubmit = useCallback(
    async (
      values: ProjectMetadataValues,
      { setSubmitting, setTouched }: FormikHelpers<ProjectMetadataValues>,
    ): Promise<void> => {
      setSubmitting(true);
      try {
        await submit(values);
        setSubmitting(false);
        setTouched({}); // reset to untouched
        if (isEdit && confirmSave) confirmSave();
      } catch (e) {
        setSubmitting(false);
      }
    },
    [confirmSave, isEdit, submit],
  );

  return onSubmit;
};

export default useProjectMetadataFormSubmit;
