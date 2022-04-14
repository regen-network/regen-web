import React from 'react';
import { makeStyles } from '@mui/styles';

import { parseText } from 'web-components/lib/utils/textParser';
import Description from 'web-components/lib/components/description';
import { Label } from 'web-components/lib/components/typography';

interface LineItemProps {
  label: string;
  data: string | JSX.Element;
}

const useStyles = makeStyles(theme => ({
  lineItem: {
    marginTop: theme.spacing(4),
  },
  label: {
    fontSize: theme.typography.pxToRem(12),
    color: theme.palette.primary.contrastText,
    letterSpacing: '1px',
    lineHeight: '15px',
    marginBottom: theme.spacing(2),
  },
  data: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: 400,
  },
}));

const LineItem = ({ label, data }: LineItemProps): JSX.Element => {
  const styles = useStyles();

  return (
    <div className={styles.lineItem}>
      <Label className={styles.label}>{label}</Label>
      <Description className={styles.data}>{parseText(data)}</Description>
    </div>
  );
};

export { LineItem };
