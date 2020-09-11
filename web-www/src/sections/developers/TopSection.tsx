import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Theme, makeStyles } from '@material-ui/core/styles';
import BackgroundSection from '../../components/BackgroundSection';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  bSection: {
    '& h1.MuiTypography-h1.MuiTypography-root': {
      fontFamily: 'PT Mono',
      lineHeight: '160%',
      fontSize: '38px',
    },
  },
}));

const TopSection = (): JSX.Element => {
  const classes = useStyles();
  const data = useStaticQuery(graphql`
    query {
      background: file(relativePath: { eq: "developers-top-image.jpg" }) {
        childImageSharp {
          fluid(quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      text: developersYaml {
        topSection {
          header
          body
        }
      }
    }
  `);
  const content = data.text.topSection;
  const imageData = data.background.childImageSharp.fluid;
  return (
    <BackgroundSection
      linearGradient="linear-gradient(220.67deg, rgba(250, 235, 209, 0.6) 21.4%, rgba(125, 201, 191, 0.6) 46.63%, rgba(81, 93, 137, 0.6) 71.86%), linear-gradient(180deg, rgba(0, 0, 0, 0.684) 0%, rgba(0, 0, 0, 0) 97.78%)"
      header={content.header}
      body={content.body}
      imageData={imageData}
      className={classes.bSection}
      headerFlair={
        <div
          style={{
            display: 'inline-block',
            width: '20px',
            height: '31px',
            backgroundColor: '#EEEEEE',
            marginLeft: '20px',
          }}
        />
      }
    />
  );
};

export default TopSection;
