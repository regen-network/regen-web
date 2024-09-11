import { z } from 'zod';

type Params = {
  requiredMessage: string;
  positiveNumber: string;
};

export const getBasicInfoFormSchema = ({
  requiredMessage,
  positiveNumber,
}: Params) =>
  z.object({
    'schema:name': z.string().min(1, requiredMessage),
    'regen:projectSize': z.object({
      'qudt:numericValue': z
        .number({
          invalid_type_error: requiredMessage,
        })
        .positive(positiveNumber)
        .optional(),
      'qudt:unit': z.string(),
    }),
  });

export const basicInfoFormDraftSchema = z
  .object({
    'schema:name': z.string(),
    'regen:projectSize': z.object({
      'qudt:numericValue': z.any().optional(),
      'qudt:unit': z.string(),
    }),
  })
  .partial();

export type BasicInfoFormSchemaType = z.infer<
  ReturnType<typeof getBasicInfoFormSchema>
>;
export type BasicInfoFormDraftSchemaType = z.infer<
  typeof basicInfoFormDraftSchema
>;
