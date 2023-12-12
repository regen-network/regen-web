import React from 'react';
import Box from '@mui/material/Box';
import { makeStyles } from 'tss-react/mui';

import Section from 'web-components/src/components/section';
import { Theme } from 'web-components/src/theme/muiTheme';

import { useWallet } from 'lib/wallet/wallet';

interface Props {
  classes?: {
    root?: string;
    section?: string;
  };
  title?: string;
}

const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.grey['50'],
  },
  section: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(24),
    },
  },
}));

const EcocreditsSection: React.FC<React.PropsWithChildren<Props>> = props => {
  const { classes: styles, cx } = useStyles();
  const { isKeplrMobileWeb } = useWallet();

  return (
    <Box
      className={cx(
        styles.root,
        'topo-background-alternate',
        isKeplrMobileWeb && 'dark',
        props?.classes?.root,
      )}
    >
      <Section
        isPaddingTopMobile={false}
        className={styles.section}
        title={props.title}
        titleVariant="h3"
        titleAlign="left"
      >
        {props.children}
      </Section>
    </Box>
  );
};

export { EcocreditsSection };
