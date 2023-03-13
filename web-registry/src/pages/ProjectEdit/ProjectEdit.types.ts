import { FormikProps } from 'formik';

import {
  BasicInfoFormValues,
  DescriptionFormValues,
  ProjectLocationFormValues,
  ProjectMetadataFormValues,
  RolesFormValues,
} from 'components/organisms';
import { MediaFormValues } from 'components/organisms/MediaForm';

export type Values =
  | BasicInfoFormValues
  | ProjectLocationFormValues
  | RolesFormValues
  | DescriptionFormValues
  | MediaFormValues
  | ProjectMetadataFormValues;

export type FormRef<T> = React.RefObject<FormikProps<T>>;
