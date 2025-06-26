import { z } from 'zod';

export const RetireFormSchema = z.object({
  note: z.string().optional(),
  country: z.string(),
  stateProvince: z.string().optional(),
  postalCode: z.string().optional(),
  retirementJurisdiction: z.string().optional(),
});

export type RetireFormSchemaType = z.infer<typeof RetireFormSchema>;

export const CreditRetireFormSchema = () =>
  z.object({
    amount: z.coerce.number(),
    retireFields: z.array(RetireFormSchema).optional(),
  });

export type CreditRetireFormSchemaType = z.infer<
  ReturnType<typeof CreditRetireFormSchema>
>;
