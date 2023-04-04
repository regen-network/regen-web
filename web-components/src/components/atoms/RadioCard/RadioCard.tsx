import { forwardRef } from 'react';
import { Box, SxProps } from '@mui/material';

import { Flex } from '../../../components/box';
import { Subtitle } from '../../../components/typography';
import { Theme } from '../../../theme/muiTheme';
import { sxToArray } from '../../../utils/mui/sxToArray';
import { RadioCardItem } from './RadioCard.types';

export interface Props {
  name: string;
  selectedValue?: string;
  label?: string;
  items: RadioCardItem[];
  sx?: SxProps<Theme>;
}

const RadioCard = forwardRef<HTMLInputElement, Props>(
  (
    { name, label, items, selectedValue, sx = [], ...props }: Props,
    ref,
  ): JSX.Element => {
    return (
      <Box sx={[...sxToArray(sx)]}>
        {label && (
          <Subtitle size="lg" sx={{ mb: 2.5 }}>
            {label}
          </Subtitle>
        )}
        <Flex>
          {items.map(item => {
            const isSelected = item.value === selectedValue;
            return (
              <Box
                component="label"
                htmlFor={item.id}
                key={item.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexGrow: 1,
                  width: '100%',
                  border: theme =>
                    isSelected
                      ? `2px solid ${theme.palette.secondary.main}`
                      : `2px solid ${theme.palette.grey[100]}`,
                  boxShadow: isSelected
                    ? 'none'
                    : '0px 2px 2px rgba(0, 0, 0, 0.15)',
                  borderRadius: '2px',
                  p: 6,
                  cursor: 'pointer',
                  ':not(:last-child)': {
                    mr: 5,
                  },
                }}
              >
                <Box
                  {...props}
                  component="input"
                  type="radio"
                  id={item.id}
                  name={name}
                  value={item.value}
                  sx={{ display: 'none' }}
                  ref={ref}
                />
                <Flex flexDirection="column" alignItems="center">
                  <Box sx={{ fontSize: 24, height: 24, width: 24, mb: 4 }}>
                    {item.icon}
                  </Box>
                  <Subtitle size="lg" sx={{ fontWeight: 900 }}>
                    {item.label}
                  </Subtitle>
                </Flex>
              </Box>
            );
          })}
        </Flex>
      </Box>
    );
  },
);

export { RadioCard };
