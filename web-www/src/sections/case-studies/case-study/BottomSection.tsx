import React from 'react';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import {
  Body,
  Label,
  Title,
} from '@regen-network/web-components/lib/components/typography';
import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import clsx from 'clsx';
import Img, { FluidObject } from 'gatsby-image';

import BackgroundSection from '../../../components/BackgroundSection';
import { SanityCaseStudyBottomSection } from '../../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderTop: `1px solid ${theme.palette.grey[100]}`,
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(19.5),
      paddingBottom: theme.spacing(15),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(41),
      paddingBottom: theme.spacing(30),
    },
  },
  image: {
    borderRadius: '50%',
    border: `1px solid ${theme.palette.info.dark}`,
    [theme.breakpoints.down('sm')]: {
      height: theme.spacing(15.5),
      width: theme.spacing(15),
    },
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(19.75),
      width: theme.spacing(18),
    },
  },
  quotes: {
    color: theme.palette.secondary.main,
    lineHeight: 0,
    zIndex: 0,
    position: 'absolute',
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(15),
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(25),
    },
  },
  textQuote: {
    position: 'relative',
    zIndex: 1,
  },
  firstQuote: {
    [theme.breakpoints.down('sm')]: {
      top: theme.spacing(4),
      left: theme.spacing(-1.75),
    },
    [theme.breakpoints.up('sm')]: {
      top: theme.spacing(6),
      left: theme.spacing(-8.75),
    },
  },
  secondQuote: {
    bottom: theme.spacing(2.5),
    marginLeft: theme.spacing(-2),
  },
}));

const BottomSection: React.FC<SanityCaseStudyBottomSection> = ({
  background,
  quote,
  personName,
  personRole,
  personImage,
}) => {
  const styles = useStyles();

  return (
    <BackgroundSection
      topSection={false}
      linearGradient="linear-gradient(209.5deg, rgba(250, 235, 209, 0.5) 12.63%, rgba(125, 201, 191, 0.5) 44.03%, rgba(81, 93, 137, 0.5) 75.43%)"
      imageData={background?.image?.asset?.fluid}
      className={styles.root}
    >
      <Title
        variant="h3"
        mobileVariant="h5"
        color="primary"
        sx={{
          position: 'relative',
          maxWidth: {
            tablet: '69%',
          },
        }}
      >
        <span className={clsx(styles.firstQuote, styles.quotes)}>“</span>
        <span className={styles.textQuote}>{quote}</span>
        <span className={clsx(styles.secondQuote, styles.quotes)}>”</span>
      </Title>
      <Grid container alignItems="center" sx={{ pt: 10 }}>
        <Img
          className={styles.image}
          fluid={personImage?.image?.asset?.fluid as FluidObject}
        />
        <Box sx={{ pl: [4, 5] }}>
          <Label size="lg" color="secondary.contrastText">
            {personName}
          </Label>
          <Body size="lg" mobileSize="sm" color="primary" pt={2}>
            {personRole}
          </Body>
        </Box>
      </Grid>
    </BackgroundSection>
  );
};

export default BottomSection;
