import { z } from 'zod';

export const inviteSchema = z.object({
  role: z.enum(['owner', 'admin', 'editor', 'viewer']).optional(),
  addressOrEmail: z.string().min(1),
  visible: z.boolean().default(true),
});

export const getPersonalProfileSchema = () =>
  z.object({
    name: z.string().min(1),
    avatar: z.string().optional(),
    title: z.string().optional(),
    description: z.string().max(160).optional(),
  });
