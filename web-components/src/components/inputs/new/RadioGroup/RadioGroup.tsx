import FieldFormControl, {
  FieldFormControlProps,
} from '../FieldFormControl/FieldFormControl';

export interface Props extends Partial<FieldFormControlProps> {
  children: React.ReactNode;
}

export const RadioGroup = ({ children, ...fieldFormProps }: Props) => (
  <FieldFormControl {...fieldFormProps}>{children}</FieldFormControl>
);
