import React from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import { graphql, useStaticQuery } from 'gatsby';
import useMediaQuery from '@mui/material/useMediaQuery';
import SanityImage from 'gatsby-plugin-sanity-image';
import ReactHtmlParser from 'react-html-parser';
import clsx from 'clsx';

import { Theme } from 'web-components/lib/theme/muiTheme';
import { Title } from 'web-components/lib/components/typography';
import Card from 'web-components/lib/components/cards/Card';

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
  title: {
    lineHeight: '135%',
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(6),
    },
    [theme.breakpoints.down('md')]: {
      paddingBottom: theme.spacing(3),
    },
    [theme.breakpoints.up('md')]: {
      paddingBottom: theme.spacing(4),
    },
  },
  cardTitle: {
    fontWeight: 800,
    color: theme.palette.info.dark,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    lineHeight: theme.spacing(3.75),
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(3),
      lineHeight: theme.spacing(4.5),
    },
  },
  cardContent: {
    color: theme.palette.info.dark,
    lineHeight: '140%',
    paddingTop: theme.spacing(2),
    [theme.breakpoints.up('xs')]: {
      fontSize: theme.spacing(4.5),
    },
  },
  description: {
    lineHeight: '140%',
    color: theme.palette.info.main,
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(5.25),
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
      paddingLeft: 'calc(15% + 20.9375rem)',
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
    <div className={styles.root}>
      <hr className={clsx(styles.line, styles.problemLine)} />
      <Card
        className={clsx(styles.card, styles.problemCard)}
        borderColor={theme.palette.grey['100']}
        borderRadius="10px"
      >
        <Title className={styles.cardTitle} variant="body2">
          {content?.problem?.title}
        </Title>
        <div className={styles.cardContent}>{content?.problem?.body}</div>
      </Card>
      <SanityImage
        {...(content?.image as any)}
        alt="Map"
        className={styles.image}
      />
      {!downMd && <hr className={clsx(styles.line, styles.solutionLine)} />}
      <Card
        className={clsx(styles.card, styles.solutionCard)}
        borderColor={theme.palette.grey['100']}
        borderRadius="10px"
      >
        <Title className={styles.cardTitle} variant="body2">
          {content?.solution?.title}
        </Title>
        <div className={styles.cardContent}>{content?.solution?.body}</div>
        {downMd && <hr className={clsx(styles.line, styles.solutionLine)} />}
      </Card>
      <div className={styles.titleContainer}>
        <Title variant="h1" className={styles.title}>
          {content?.header}
        </Title>
        <Title variant="h3" className={styles.description}>
          {ReactHtmlParser(content?.description || '')}
        </Title>
      </div>
    </div>
  );
};

export default ClimateSection;
