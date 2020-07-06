import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { makeStyles, useTheme, Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Title from 'web-components/lib/components/title';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import Img from 'gatsby-image';
import ReactHtmlParser from 'react-html-parser'; 

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  img: {
    float: 'right',
  },
  textBlock: {
    display: 'inline-block',
    width: '40vw',
    'margin-top': '10vw',
    'margin-left': '10vw',
    '& p.MuiTypography-body2': {
      color: theme.palette.primary.contrastText,
    },
  },
  smallHeader: {
    color: theme.palette.primary.contrastText,
  },
  creditName: {
    color: theme.palette.secondary.main,
  },
}));

const CarbonplusSection = () => {
  const data = useStaticQuery(graphql`
    query {
      cow: file(relativePath: { eq: "cow.png" }) {
        childImageSharp {
          fixed(quality: 90) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
      text: contentYaml {
        carbonPlusSection {
          smallHeader {
            featured
            creditName
          }
          header
          description
          linkText
        }
      }
    }
  `);
  const classes = useStyles({});
  const theme = useTheme();
  const content = data.text.carbonPlusSection;

  return (
    <section>
      <Grid container className={classes.textBlock}>
        <Grid item>
          <Typography className={classes.smallHeader}>
            <span>{content.smallHeader.featured}</span>
            <span className={classes.creditName}>{ReactHtmlParser(content.smallHeader.creditName)}</span>
          </Typography>
          <Title variant="h3">{ReactHtmlParser(content.header)}</Title>
          <Typography variant="body2">{ReactHtmlParser(content.description)}</Typography>
        </Grid>
        <Grid item>
          <Img className={classes.img} fixed={data.cow.childImageSharp.fixed} />
        </Grid>
      </Grid>
    </section>
  );
};

export default CarbonplusSection;
