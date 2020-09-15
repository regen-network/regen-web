import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { Theme, makeStyles } from '@material-ui/core/';
import clsx from 'clsx';

import BackgroundSection from '../../components/BackgroundSection';

interface Props {
  paddingLR?: number;
}

const useStyles = makeStyles<Theme, Props>((theme: Theme) => ({
  section: props => ({
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(42.75),
      paddingLeft: props.paddingLR || 'none',
      paddingRight: props.paddingLR || 'none',
    },
  }),
}));

const TopSection = ({ paddingLR }: Props): JSX.Element => {
  const gradient =
    'linear-gradient(180deg, #FFF9EE 2.02%, rgba(255, 249, 238, 0) 37.98%), linear-gradient(209.83deg, rgba(250, 235, 209, 0.9) 11.05%, rgba(125, 201, 191, 0.9) 43.17%, rgba(81, 93, 137, 0.9) 75.29%);';
  const classes = useStyles({ paddingLR });

  return (
    <StaticQuery
      query={graphql`
        query {
          background: file(relativePath: { eq: "investors-top.jpg" }) {
            childImageSharp {
              fluid(quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          backgroundMobile: file(relativePath: { eq: "investors-top-mobile.jpg" }) {
            childImageSharp {
              fluid(quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          text: investYaml {
            topSection {
              header
              body
            }
          }
        }
      `}
      render={data => {
        return (
          <>
            <BackgroundSection
              linearGradient={gradient}
              header={data.text.topSection.header}
              body={data.text.topSection.body}
              className={classes.section}
              imageData={data.background.childImageSharp.fluid}
              imageDataMobile={data.backgroundMobile.childImageSharp.fluid}
            />
          </>
        );
      }}
    />
  );
};

export default TopSection;
