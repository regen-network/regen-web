import React from 'react';
import BackgroundImage from 'gatsby-background-image';
import { graphql, useStaticQuery } from 'gatsby';
import Grid from '@mui/material/Grid';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import { Theme } from 'web-components/lib/theme/muiTheme';
import Title from 'web-components/lib/components/title';
import Img from 'gatsby-image';

let useStyles = makeStyles((theme: Theme) => ({
  grid: {
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      paddingTop: theme.spacing(20),
      paddingBottom: theme.spacing(51.25),
      flexDirection: 'column',
    },
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      paddingTop: theme.spacing(24.25),
      paddingRight: theme.spacing(30.25),
      paddingBottom: theme.spacing(39.5),
    },
  },
  title: {
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(6),
    },
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      paddingTop: theme.spacing(10),
    },
  },
  img: {
    width: '100%',
  },
  imgContainer: {
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      paddingRight: theme.spacing(25),
      flexGrow: 0,
      maxWidth: '45%',
      flexBasis: '45%',
    },
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      paddingRight: theme.spacing(4),
      width: '100%',
    },
  },
  button: {
    [theme.breakpoints.down('xs')]: {
      height: theme.spacing(12.5),
      fontSize: theme.spacing(4.5),
    },
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(15),
      fontSize: theme.spacing(5.25),
    },
  },
  description: {
    color: theme.palette.info.dark,
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(4),
      lineHeight: '150%',
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(6),
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(5.5),
      lineHeight: '160%',
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(8.5),
    },
  },
  green: {
    color: theme.palette.secondary.main,
  },
  text: {
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      paddingRight: theme.spacing(4),
      paddingLeft: theme.spacing(4),
    },
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      flexGrow: 0,
      maxWidth: '55%',
      flexBasis: '55%',
    },
  },
}));

const HomeLedger = () => {
  const data = useStaticQuery(graphql`
    {
      bg: file(relativePath: { eq: "farm-background.png" }) {
        childImageSharp {
          fluid(quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      ledger: file(relativePath: { eq: "ledger.png" }) {
        childImageSharp {
          fluid(quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      text: homeYaml {
        ledgerSection {
          description
        }
      }
    }
  `);
  const classes = useStyles();
  const content = data.text.ledgerSection; // TODO add title content to yaml once structure for styling set

  return (
    <BackgroundImage Tag="section" fluid={data.bg.childImageSharp.fluid}>
      <Grid className={classes.grid} container alignItems="center" wrap="nowrap">
        <Grid className={classes.imgContainer} item xs={12}>
          <Img fluid={data.ledger.childImageSharp.fluid} className={classes.img} />
        </Grid>
        <Grid item xs={12} className={classes.text}>
          <Title align="left" variant="h1" className={classes.title}>
            <span className={classes.green}>Regen Ledger</span> powers{' '}
            <span className={classes.green}>Regen Registry</span>
          </Title>
          <Typography className={classes.description}>{content.description}</Typography>
          <ContainedButton href="/developers" className={classes.button}>
            Learn More
          </ContainedButton>
        </Grid>
      </Grid>
    </BackgroundImage>
  );
};

export default HomeLedger;
