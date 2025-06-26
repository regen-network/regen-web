import { useForm, UseFormProps } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, ZodTypeAny } from 'zod';

interface UseZodFormProps<
  TSchema extends ZodTypeAny,
  TDraftSchema extends ZodTypeAny = TSchema,
> extends Omit<UseFormProps<z.infer<TSchema>>, 'resolver'> {
  schema: TSchema;
  draftSchema?: TDraftSchema;
  isDraftRef?: React.MutableRefObject<boolean>;
}

export const useZodForm = <
  TSchema extends ZodTypeAny,
  TDraftSchema extends ZodTypeAny = TSchema,
>({
  schema,
  draftSchema,
  isDraftRef,
  ...formProps
}: UseZodFormProps<TSchema, TDraftSchema>) =>
  useForm({
    ...formProps,
    resolver: (...args) => {
      if (isDraftRef?.current && draftSchema) {
        return zodResolver(draftSchema)(...args);
      }
      return zodResolver(schema)(...args);
    },
  });
