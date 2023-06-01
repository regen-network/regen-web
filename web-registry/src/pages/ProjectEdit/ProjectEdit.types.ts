import { FormikProps } from 'formik';

import {
  BasicInfoFormValues,
  ProjectLocationFormValues,
  ProjectMetadataFormValues,
} from 'components/organisms';
import { DescriptionSchemaType } from 'components/organisms/DescriptionForm/DescriptionForm.schema';
import { MediaFormValues } from 'components/organisms/MediaForm';
import { RolesFormSchemaType } from 'components/organisms/RolesForm/RolesForm.schema';

export type Values =
  | BasicInfoFormValues
  | ProjectLocationFormValues
  | RolesFormSchemaType
  | DescriptionSchemaType
  | MediaFormValues
  | ProjectMetadataFormValues;

export type FormRef<T> = React.RefObject<FormikProps<T>>;
