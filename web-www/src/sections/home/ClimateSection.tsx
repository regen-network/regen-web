import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Box, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { makeStyles } from '@mui/styles';
import Card from '@regen-network/web-components/lib/components/cards/Card';
import {
  Body,
  Label,
  Title,
} from '@regen-network/web-components/lib/components/typography';
import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import clsx from 'clsx';
import { graphql, useStaticQuery } from 'gatsby';
import SanityImage from 'gatsby-plugin-sanity-image';

import { HomeClimateSectionQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(9),
    },
    [theme.breakpoints.down('md')]: {
      paddingTop: theme.spacing(20.75),
    },
  },
  card: {
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(5),
      width: theme.spacing(83.75),
      position: 'absolute',
    },
    [theme.breakpoints.down('md')]: {
      padding: `${theme.spacing(6)} ${theme.spacing(5)}`,
    },
  },
  image: {
    [theme.breakpoints.up('md')]: {
      width: '60%',
    },
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  line: {
    position: 'absolute',
    borderTop: `1px solid ${theme.palette.grey[100]}`,
  },
  problemLine: {
    zIndex: -1,
    [theme.breakpoints.up('md')]: {
      transform: 'rotate(78.11deg)',
      width: theme.spacing(115),
      bottom: theme.spacing(64),
      left: '0',
    },
    [theme.breakpoints.up('xl')]: {
      width: theme.spacing(70),
      bottom: theme.spacing(57),
      left: '5%',
    },
    [theme.breakpoints.down('md')]: {
      transform: 'rotate(116.57deg)',
      width: theme.spacing(65),
      top: theme.spacing(70),
      left: theme.spacing(-5),
    },
    [theme.breakpoints.down('sm')]: {
      top: theme.spacing(50),
      left: theme.spacing(-15),
    },
  },
  solutionLine: {
    [theme.breakpoints.up('md')]: {
      transform: 'rotate(9.71deg)',
      width: theme.spacing(57.75),
      right: 'calc(6% + 20.9375rem - 4px)',
      top: theme.spacing(52),
    },
    [theme.breakpoints.up('xl')]: {
      top: theme.spacing(58),
      width: '25%',
    },
    [theme.breakpoints.down('md')]: {
      zIndex: -1,
      transform: 'rotate(68.36deg)',
      right: '12%',
      width: theme.spacing(87.5),
      top: theme.spacing(-20),
    },
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(35),
      top: theme.spacing(-16),
    },
  },
  problemCard: {
    [theme.breakpoints.up('md')]: {
      left: '10%',
      bottom: 0,
    },
    [theme.breakpoints.down('md')]: {
      marginRight: '20%',
      marginLeft: theme.spacing(5),
    },
  },
  solutionCard: {
    [theme.breakpoints.up('md')]: {
      right: '6%',
      top: theme.spacing(48.5),
    },
    [theme.breakpoints.up('xl')]: {
      top: theme.spacing(60),
    },
    [theme.breakpoints.down('md')]: {
      position: 'relative',
      overflow: 'visible',
      marginLeft: '30%',
      marginRight: theme.spacing(5),
      marginTop: theme.spacing(-11.25),
    },
  },
  titleContainer: {
    [theme.breakpoints.up('md')]: {
      paddingLeft: 'calc(18% + 20.9375rem)',
      paddingRight: '8%',
      marginTop: '-6%',
    },
    [theme.breakpoints.up('xl')]: {
      marginTop: '-8%',
    },
    [theme.breakpoints.down('md')]: {
      paddingTop: theme.spacing(15),
      paddingRight: theme.spacing(4),
      paddingLeft: theme.spacing(4),
    },
  },
}));

const query = graphql`
  query homeClimateSection {
    sanityHomePageWeb {
      climateSection {
        header
        description
        image {
          ...ImageWithPreview
        }
        solution {
          title
          body
        }
        problem {
          title
          body
        }
      }
    }
  }
`;

const ClimateSection: React.FC = (): JSX.Element => {
  const styles = useStyles();
  const theme = useTheme();
  const downMd = useMediaQuery(theme.breakpoints.down('md'));
  const data = useStaticQuery<HomeClimateSectionQuery>(query);
  const content = data.sanityHomePageWeb?.climateSection;

  return (
    <Box
      className={styles.root}
      sx={{
        position: 'relative',
        pt: { xs: 20.75, md: 9 },
        color: 'info.dark',
      }}
    >
      <hr className={clsx(styles.line, styles.problemLine)} />
      <Card
        className={clsx(styles.card, styles.problemCard)}
        borderColor="grey.100"
        borderRadius="10px"
      >
        <Label size="sm">{content?.problem?.title}</Label>
        <Body size="lg" sx={{ pt: 2 }}>
          {content?.problem?.body}
        </Body>
      </Card>
      <SanityImage
        {...(content?.image as any)}
        alt="Map"
        className={styles.image}
      />
      {!downMd && <hr className={clsx(styles.line, styles.solutionLine)} />}
      <Card
        className={clsx(styles.card, styles.solutionCard)}
        borderColor="grey.100"
        borderRadius="10px"
      >
        <Label size="sm" color="info.dark">
          {content?.solution?.title}
        </Label>
        <Body size="lg" pt={2}>
          {content?.solution?.body}
        </Body>
        {downMd && <hr className={clsx(styles.line, styles.solutionLine)} />}
      </Card>
      <div className={styles.titleContainer}>
        <Title
          variant="h1"
          mobileVariant="h4"
          sx={{ color: 'black', pb: { xs: 3, md: 4 } }}
        >
          {content?.header}
        </Title>
        <Title variant="h3" mobileVariant="h5" sx={{ color: 'info.main' }}>
          {ReactHtmlParser(content?.description || '')}
        </Title>
      </div>
    </Box>
  );
};

export default ClimateSection;
