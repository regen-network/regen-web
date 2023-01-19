import { z } from 'zod';

export const RetireFormSchema = z.object({
  note: z.string().optional(),
  country: z.string(),
  stateProvince: z.string().optional(),
  postalCode: z.string().optional(),
  retirementJurisdiction: z.string().optional(),
});

export type RetireFormSchemaType = z.infer<typeof RetireFormSchema>;

export const CreditSendFormSchema = z.object({
  sender: z.string(),
  recipient: z.string(),
  withRetire: z.boolean().optional(),
  agreeErpa: z.boolean(),
  amount: z.number(),
  retireFields: z.array(RetireFormSchema).optional(),
});

export type CreditSendFormSchemaType = z.infer<typeof CreditSendFormSchema>;
