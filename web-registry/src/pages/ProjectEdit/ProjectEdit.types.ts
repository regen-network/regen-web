import { FormikProps } from 'formik';

import {
  BasicInfoFormValues,
  ProjectLocationFormValues,
  ProjectMetadataFormValues,
  RolesFormValues,
} from 'components/organisms';
import { DescriptionSchemaType } from 'components/organisms/DescriptionForm/DescriptionForm.schema';
import { MediaFormValues } from 'components/organisms/MediaForm';

export type Values =
  | BasicInfoFormValues
  | ProjectLocationFormValues
  | RolesFormValues
  | DescriptionSchemaType
  | MediaFormValues
  | ProjectMetadataFormValues;

export type FormRef<T> = React.RefObject<FormikProps<T>>;
