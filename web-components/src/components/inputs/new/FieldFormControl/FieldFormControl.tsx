import { ReactNode } from 'react';
import { FormControl, FormHelperText, SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';

import FormLabel from '../FormLabel/FormLabel';
import { useFieldFormControlStyles } from './FieldFormControl.styles';

export interface DefaultStyleProps {
  defaultStyle?: boolean;
  // forceDefaultStyle applies default style even if first-of-type,
  // this may be useful when the element is the only child of some wrapper element
  // e.g. in Grid's item
  forceDefaultStyle?: boolean;
}

export interface FieldFormControlProps extends DefaultStyleProps {
  children: ReactNode;
  className?: string;
  sx?: SxProps<Theme>;
  description?: ReactNode;
  disabled?: boolean;
  optional?: boolean | string;
  label?: ReactNode;
  onExampleClick?: () => void;
  error?: boolean;
  helperText?: string;
}

/**
 *  This component uses MUI's `FormControl` component as a wrapper
 */
export default function FieldFormControl({
  children,
  label,
  description,
  disabled,
  className,
  sx,
  optional,
  onExampleClick,
  defaultStyle = true,
  forceDefaultStyle = false,
  error = false,
  helperText,
}: FieldFormControlProps): JSX.Element {
  const { classes: styles, cx } = useFieldFormControlStyles({
    disabled,
    description,
    error,
  });
  const defaultClasses = [styles.default, className];
  const rootClasses = defaultStyle
    ? forceDefaultStyle
      ? defaultClasses
      : [...defaultClasses, styles.firstOfType]
    : className;

  return (
    <FormControl sx={sx} className={cx(rootClasses)} error={error} fullWidth>
      {label && (
        <FormLabel
          className={styles.label}
          label={label}
          optional={optional}
          description={description}
          onExampleClick={onExampleClick}
          disabled={disabled}
        />
      )}
      {children}

      {error && (
        <FormHelperText className={styles.error}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
}
