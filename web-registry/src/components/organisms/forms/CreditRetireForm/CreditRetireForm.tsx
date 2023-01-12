import { z } from 'zod';

export const schema = z.object({
  retiredAmount: z.number().min(0.000001, { message: 'Required' }),
  note: z.optional(z.string().min(1)),
  country: z.string().min(1, { message: 'Required' }),
  stateProvince: z.optional(z.string().min(1)),
  postalCode: z.optional(z.string().min(1)),
  // retirementJurisdiction: z.string().min(1, { message: 'Required' }),
});

export type FormValues = z.infer<typeof schema>;

export const initialValues: FormValues = {
  retiredAmount: 0,
  note: '',
  country: 'US',
  // stateProvince: '',
};
