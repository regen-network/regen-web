import React, { useState } from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import Grid from '@mui/material/Grid';
import { useStaticQuery, graphql } from 'gatsby';

import TopSection from '../sections/invest/TopSection';
import FormSection from '../sections/invest/FormSection';
import SEO from '../components/seo';
import Modal from 'web-components/lib/components/modal';
import Section from 'web-components/lib/components/section';
import Title from 'web-components/lib/components/title';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    lineHeight: '150%',
  },
  notInterestedTitle: {
    lineHeight: '145%',
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(23),
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: theme.spacing(207),
      margin: '0 auto',
      paddingTop: theme.spacing(35.25),
      paddingBottom: theme.spacing(27.5),
    },
  },
  grid: {
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      flexDirection: 'column-reverse',
      paddingTop: theme.spacing(6.5),
    },
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      justifyContent: 'space-between',
      paddingTop: theme.spacing(12.5),
    },
  },
  notInterested: {
    fontFamily: theme.typography.h1.fontFamily,
    fontWeight: 800,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    color: theme.palette.info.main,
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      paddingTop: theme.spacing(4.25),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3),
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(3.5),
    },
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      paddingRight: theme.spacing(6),
    },
  },
  modal: {
    borderRadius: '5px',
    transform: 'translate(-50%, -50%)',
    top: '50%',
    left: '50%',
    [theme.breakpoints.down('xs')]: {
      width: '95%',
      height: theme.spacing(65),
      padding: `${theme.spacing(10.5)} ${theme.spacing(6.5)} ${theme.spacing(7.25)}`,
    },
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(150),
      height: theme.spacing(70),
      padding: `${theme.spacing(10.5)} ${theme.spacing(10)} ${theme.spacing(12.5)}`,
    },
  },
  button: {
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(18.75),
    },
  },
}));

interface props {
  location: Location;
}

const InvestPage = ({ location }: props): JSX.Element => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [interested, setInterested] = useState(true);

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleNotInterested = (): void => {
    setInterested(false);
    handleClose();
  };

  const data = useStaticQuery(graphql`
    query {
      seoImage: file(relativePath: { eq: "investors-top.jpg" }) {
        publicURL
      }
    }
  `);

  return (
    <>
      <SEO
        description="Learn about investment opportunities at Regen Network."
        title="Invest"
        location={location}
        imageUrl={data.seoImage.publicURL}
      />
      {interested ? (
        <>
          <TopSection />
          <FormSection />
        </>
      ) : (
        <Section>
          <Title className={classes.notInterestedTitle} align="center" variant="h2">
            Sorry, this page is only for people interested in the token sale.
          </Title>
        </Section>
      )}
      <Modal open={open} onClose={handleClose} className={classes.modal}>
        <div>
          <Title className={classes.title} align="center" variant="h4">
            Are you interested in the Regen Network token sale?
          </Title>
          <Grid container className={classes.grid} wrap="nowrap" alignItems="center" spacing={2}>
            <div onClick={handleNotInterested} className={classes.notInterested}>
              no, I'm not interested
            </div>
            <ContainedButton className={classes.button} onClick={handleClose}>
              yes, I'm interested
            </ContainedButton>
          </Grid>
        </div>
      </Modal>
    </>
  );
};

export default InvestPage;
