import React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import cx from 'clsx';
import Section from 'web-components/lib/components/section';
import { Theme } from 'web-components/lib/theme/muiTheme';

interface Props {
  classes?: {
    root?: string;
    section?: string;
  };
  title?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.grey['50'],
  },
  section: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(24),
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(12),
    },
  },
}));

const EcocreditsSection: React.FC<Props> = props => {
  const styles = useStyles();

  return (
    <Box
      className={cx(
        styles.root,
        'topo-background-alternate',
        props?.classes?.root,
      )}
    >
      <Section
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
