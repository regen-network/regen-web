import { makeStyles } from 'tss-react/mui';

import { pxToRem, Theme } from '../../../../theme/muiTheme';

type RadioStylesProps = {
  isSelected?: boolean;
};

export const useRadioStyles = makeStyles<RadioStylesProps>()(
  (theme: Theme, { isSelected }) => ({
    defaultVariant: {
      padding: pxToRem(15),
      backgroundColor: isSelected
        ? theme.palette.grey['50']
        : theme.palette.primary.main,
      borderRadius: 5,
      border: `1px solid ${theme.palette.grey['100']}`,
    },
    radioBtn: {
      borderRadius: '50%',
      width: 20,
      height: 20,
      boxShadow:
        'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
      backgroundColor: theme.palette.primary.main,
      '$root.Mui-focusVisible &': {
        outline: `2px auto ${theme.palette.secondary.main}`,
        outlineOffset: 2,
      },
      'input:hover ~ &': {
        backgroundColor: theme.palette.primary.main,
      },
      'input:disabled ~ &': {
        boxShadow: 'none',
        background: theme.palette.primary.main,
        borderColor: theme.palette.grey['100'],
        border: '1px solid',
      },
    },
    checkedRadioBtn: {
      backgroundColor: theme.palette.secondary.main,
      boxShadow: 'none',
      '&:before': {
        display: 'block',
        width: 20,
        height: 20,
        backgroundImage: `radial-gradient(${theme.palette.primary.main},${theme.palette.primary.main} 33%,transparent 40%)`,
        content: '""',
      },
      'input:hover ~ &': {
        backgroundColor: theme.palette.secondary.main,
      },
    },
    radioLabel: {
      '& .MuiFormControlLabel-label': {
        fontWeight: isSelected ? 700 : 400,
        marginLeft: pxToRem(15),
        alignItems: 'flex-start',
      },
    },
  }),
);
