import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Theme, makeStyles } from '@mui/material';
import ReactHtmlParser from 'react-html-parser';
import Title from 'web-components/lib/components/title';
import Section from 'web-components/lib/components/section';
import Description from 'web-components/lib/components/description';

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(21.5),
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(3),
      paddingTop: theme.spacing(17),
    },
  },
  title: {
    marginBottom: theme.spacing(8.5),
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(6.75),
    },
  },
  body: {
    textAlign: 'center',
    marginBottom: theme.spacing(15),
    maxWidth: theme.spacing(225),
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(4),
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(5.5),
    },
  },
}));

const InstructionsSection = (): JSX.Element => {
  const data = useStaticQuery(graphql`
    query {
      text: walletAddressRegistrationYaml {
        instructionsSection {
          header
          body
        }
      }
    }
  `);
  const content = data?.text?.instructionsSection;
  const classes = useStyles();
  return (
    <Section className={classes.section}>
      <Title className={classes.title} variant="h3" align="center">
        {content?.header}
      </Title>
      <Description className={classes.body}>{ReactHtmlParser(content?.body)}</Description>
    </Section>
  );
};

export default InstructionsSection;
