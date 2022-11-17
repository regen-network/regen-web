import React from 'react';
import { Box, Collapse, FormControlLabel, TooltipProps } from '@mui/material';
import { FieldProps } from 'formik';

import Checkbox from '../inputs/Checkbox';
import Radio from '../inputs/Radio';
import InfoTooltipWithIcon from '../tooltip/InfoTooltipWithIcon';
import { Body } from '../typography';

interface ToggleProps extends FieldProps {
  className?: string;
  label: string;
  type?: 'checkbox' | 'radio';
  checked: boolean;
  description?: any;
  content?: any;
  activeContent?: any;
  tooltip?: TooltipProps['title'];
  disabled?: boolean;
  value?: string;
  triggerOnChange?: (v: any) => Promise<void>;
}

const Toggle: React.FC<React.PropsWithChildren<ToggleProps>> = ({
  className,
  label,
  checked,
  description,
  content,
  activeContent,
  tooltip,
  disabled = false,
  type,
  value,
  field,
  form,
  meta,
  triggerOnChange,
}) => {
  return (
    <Box
      sx={[
        {
          border: 1,
          borderColor: 'info.light',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '5px',
          transition: '200ms ease-in-out;',
          backgroundColor: 'primary.main',
          mt: 3.25,
          p: [3.25, 3.5],
        },
        disabled && {
          backgroundColor: 'info.light',
          borderColor: 'grey.100',
        },
        checked && {
          borderColor: 'secondary.contrastText',
          boxShadow: 1,
        },
      ]}
      className={className}
    >
      <Box sx={{ display: 'flex' }}>
        <FormControlLabel
          sx={{ alignItems: 'flex-start', mr: 2 }}
          control={
            type === 'checkbox' ? (
              <Checkbox
                sx={{ py: 0.5 }}
                field={field}
                form={form}
                meta={meta}
                indeterminate={false}
                triggerOnChange={triggerOnChange}
                type="checkbox"
              />
            ) : (
              <Radio sx={{ py: 1 }} />
            )
          }
          label={
            <Body
              size="lg"
              sx={[
                { ml: 1 },
                checked && { fontWeight: 700 },
                { color: disabled ? 'info.dark' : 'black' },
              ]}
            >
              {label}
            </Body>
          }
          value={value}
          disabled={disabled}
          checked={checked}
        />
        {tooltip && <InfoTooltipWithIcon title={tooltip} />}
      </Box>
      {description && (
        <Body
          size="md"
          mobileSize="xs"
          styleLinks={!disabled}
          sx={[
            {
              pl: 6.9,
            },
            type === 'checkbox' && {
              pl: 8,
            },
            !!disabled && {
              color: 'info.main',
            },
            !!disabled &&
              type === 'checkbox' && {
                pl: 8,
              },
          ]}
        >
          {description}
        </Body>
      )}
      {content && <Box pt={4}>{content}</Box>}
      {activeContent && (
        <Collapse
          in={checked}
          sx={{
            '& 	.MuiCollapse-wrapperInner': {
              pt: 4,
            },
          }}
        >
          {activeContent}
        </Collapse>
      )}
    </Box>
  );
};

export default Toggle;
