import React from 'react';
import { makeStyles } from '@mui/styles';
import OutlinedButton from '@regen-network/web-components/lib/components/buttons/OutlinedButton';
import {
  Body,
  Title,
} from '@regen-network/web-components/lib/components/typography';
import type { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import { BlockContent } from '@regen-network/web-components/lib/components/block-content';
import { graphql, useStaticQuery } from 'gatsby';

import BackgroundSection from '../../components/BackgroundSection';
import type { DevCareersSectionQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(17.75),
    },
  },
  caption: {
    fontWeight: 'normal',
    fontFamily: theme.typography.overline.fontFamily,
    color: theme.palette.secondary.main,
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(7),
      lineHeight: '130%',
      paddingBottom: theme.spacing(6),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(5),
      lineHeight: '160%',
      paddingBottom: theme.spacing(3.75),
    },
  },
  buttonContainer: {
    textAlign: 'center',
    marginTop: theme.spacing(7.5),
  },
}));

const query = graphql`
  query devCareersSection {
    background: file(relativePath: { eq: "developers-careers-bg.jpg" }) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    sanityDevelopersPage {
      careersSection {
        caption
        header
        _rawBody
        button {
          ...buttonFields
        }
      }
    }
  }
`;

const CareersSection: React.FC = () => {
  const styles = useStyles();
  const { background, sanityDevelopersPage } =
    useStaticQuery<DevCareersSectionQuery>(query);
  const data = sanityDevelopersPage?.careersSection;
  return (
    <BackgroundSection
      linearGradient="unset"
      topSection={false}
      className={styles.section}
      imageData={background?.childImageSharp?.fluid}
    >
      <div className={styles.caption}>{data?.caption}</div>
      <Title align="center" variant="h2" sx={{ pb: [6, 9] }}>
        {data?.header}
      </Title>
      <Body
        as="div"
        size="lg"
        align="center"
        sx={{ m: { sm: '0 auto' }, maxWidth: { sm: 754 } }}
      >
        <BlockContent content={data?._rawBody} />
      </Body>
      <div className={styles.buttonContainer}>
        <OutlinedButton
          target="_blank"
          href={`${data?.button?.buttonLink?.buttonHref}`}
        >
          {data?.button?.buttonText}
        </OutlinedButton>
      </div>
    </BackgroundSection>
  );
};

export default CareersSection;
