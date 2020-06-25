import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { makeStyles, useTheme, Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Title from 'web-components/lib/components/title';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import Img from 'gatsby-image';

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
}));

const CarbonplusSection = () => {
  const data = useStaticQuery(graphql`
    query {
      cow: file(relativePath: { eq: "cow.png" }) {
        childImageSharp {
          fixed(quality: 90, width: 671) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
      text: contentYaml {
        carbonPlusSection {
          smallHeader
          smallHeaderApplyGreen
          header
          headerApplyItalicize
          descriptionOne
          descriptionTwo
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
      <div className={classes.textBlock}>
        <Typography
          className={classes.smallHeader}
          dangerouslySetInnerHTML={{
            __html: content.smallHeader.replace(
              content.smallHeaderApplyGreen,
              `<span style="color:${theme.palette.secondary.main}">${content.smallHeaderApplyGreen}</span>`,
            ),
          }}
        ></Typography>
        <Title variant="h3">CarbonPlus Credits remove carbon and restore natural grassland ecosystems</Title>
        <Typography variant="body2">
          Shifting to managed grazing can potentially sequester 16.4 ------- 26 CO2e (Gt) by 2050. Wilmot
          Cattle Co. has increased soil organic carbon to 4.5% and removed over 30,000 tons of CO2e in two
          years. Co-benefits include ecosystem health, animal welfare and soil health.
        </Typography>
      </div>
      <Img className={classes.img} fixed={data.cow.childImageSharp.fixed} />
      <div style={{ clear: 'both' }} />
    </section>
  );
};

export default CarbonplusSection;
