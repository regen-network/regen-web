/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useForm, UseFormProps } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

interface UseZodFormProps<S extends z.ZodSchema>
  extends Exclude<UseFormProps<z.infer<S>>, 'resolver'> {
  schema: S;
}

export const useZodForm = <S extends z.ZodSchema>({
  schema,
  ...formProps
}: UseZodFormProps<S>) =>
  useForm({
    ...formProps,
    resolver: zodResolver(schema),
  });
