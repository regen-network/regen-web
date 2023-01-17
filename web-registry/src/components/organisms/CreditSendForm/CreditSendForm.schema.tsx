import { z } from 'zod';

export const CreditSendFormSchema = z.object({
  sender: z.string(),
  recipient: z.string(),
  totalAmount: z.number(),
  withRetire: z.boolean().optional(),
  agreeErpa: z.boolean(),
  retiredAmount: z.number(),
  note: z.string().optional(),
  country: z.string(),
  stateProvince: z.string().optional(),
  postalCode: z.string().optional(),
  retirementJurisdiction: z.string().optional(),
});

export type CreditSendFormSchemaType = z.infer<typeof CreditSendFormSchema>;
