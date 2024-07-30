import { z } from 'zod';

export const agreePurchaseFormSchema = (retiring: boolean) =>
  z.object({
    retirementReason: z.string().optional(),
    anonymousPurchase: z.string().optional(),
    country: retiring ? z.string().min(1) : z.string().optional(),
    stateProvince: z.string(),
    postalCode: z.string(),
    followProject: z.boolean(),
    agreeTerms: z.boolean().refine(value => value),
  });

export type AgreePurchaseFormSchemaType = z.infer<
  ReturnType<typeof agreePurchaseFormSchema>
>;
