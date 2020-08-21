import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { makeStyles, Theme } from '@material-ui/core';

import Tooltip from 'web-components/lib/components/tooltip';
import BackgroundSection from '../../components/BackgroundSection';

const useStyles = makeStyles((theme: Theme) => ({
  tooltip: {
    color: theme.palette.info.contrastText,
    borderBottom: `3px dashed ${theme.palette.info.contrastText}`,
  },
}));

const TopSection = () => {
  const classes = useStyles({});
  const data = useStaticQuery(graphql`
    query {
      desktop: file(relativePath: { eq: "buyers-top.jpg" }) {
        childImageSharp {
          fluid(quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      text: buyersYaml {
        topSection {
          header
          body {
            start
            underlined
            end
          }
        }
      }
    }
  `);
  const imageData = data.desktop.childImageSharp.fluid;
  const content = data.text.topSection;
  return (
    <BackgroundSection
      header={content.header}
      body={
        <span>
          {content.body.start}{' '}
          <Tooltip
            arrow
            placement="top"
            title="Ecosystem services are the benefits people receive from healthy ecosystems, including clean air and water, resilient food systems, and mitigation of extreme climate events."
          >
            <span className={classes.tooltip}>{content.body.underlined}</span>
          </Tooltip>{' '}
          {content.body.end}
        </span>
      }
      imageData={imageData}
    />
  );
};

export default TopSection;
