import { useForm, UseFormProps } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

interface UseZodFormProps<S extends z.ZodSchema, D extends z.ZodSchema>
  extends Exclude<UseFormProps<z.infer<S>>, 'resolver'> {
  schema: S;
  draftSchema?: D;
  isDraftRef?: React.MutableRefObject<boolean>;
}

export const useZodForm = <S extends z.ZodSchema, D extends z.ZodSchema>({
  schema,
  draftSchema,
  isDraftRef,
  ...formProps
}: UseZodFormProps<S, D>) =>
  useForm({
    ...formProps,
    resolver: (...args) => {
      if (isDraftRef?.current && draftSchema) {
        return zodResolver(draftSchema)(...args);
      }
      return zodResolver(schema)(...args);
    },
  });
