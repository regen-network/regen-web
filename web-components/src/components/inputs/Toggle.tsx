import React from 'react';
import { FormControlLabel, Collapse, Box } from '@mui/material';
import { FieldProps } from 'formik';

import InfoIconOutlined from '../icons/InfoIconOutlined';
import Tooltip from '../tooltip/InfoTooltip';
import Radio from '../inputs/Radio';
import Checkbox from '../inputs/Checkbox';
import { Body } from '../typography';

interface ToggleProps extends FieldProps {
  className?: string;
  label: string;
  type?: 'checkbox' | 'radio';
  checked: boolean;
  description?: any;
  content?: any;
  activeContent?: any;
  tooltip?: string;
  disabled?: boolean;
  value?: string;
  triggerOnChange?: (v: any) => Promise<void>;
}

const Toggle: React.FC<ToggleProps> = ({
  className,
  label,
  checked,
  description,
  content,
  activeContent,
  tooltip,
  disabled,
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
          mt: 3.25,
          p: [3.25, 3.5],
        },
        checked && {
          borderColor: 'secondary.contrastText',
          boxShadow: 1,
          bgcolor: 'grey.50',
        },
      ]}
      className={className}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <FormControlLabel
          sx={{ alignItems: 'flex-start' }}
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
              color="black"
              sx={[{ ml: 1 }, checked && { fontWeight: 700 }]}
            >
              {label}
            </Body>
          }
          value={value}
          disabled={disabled}
          checked={checked}
        />
        {tooltip && (
          <Tooltip arrow placement="top" title={tooltip}>
            <Box sx={{ cursor: 'pointer' }}>
              <InfoIconOutlined />
            </Box>
          </Tooltip>
        )}
      </Box>
      {description && (
        <Body
          size="md"
          mobileSize="xs"
          sx={[
            {
              pl: 6.9,
            },
            type === 'checkbox' && {
              pl: 8,
            },
            !!disabled && {
              color: 'grey.600',
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
