import React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Section from 'web-components/lib/components/section';
import { Theme } from 'web-components/lib/theme/muiTheme';

interface Props {
  title?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(12),
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(8),
    },
  },
}));

const EcocreditsSection: React.FC<Props> = props => {
  const styles = useStyles();

  return (
    <Box sx={{ backgroundColor: 'grey.50' }}>
      <Section
        className={styles.root}
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
