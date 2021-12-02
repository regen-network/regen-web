import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import {
  Grid,
  createStyles,
  withStyles,
  makeStyles,
  Theme,
  Typography,
  LinearProgress,
} from '@material-ui/core';
import Img, { FluidObject } from 'gatsby-image';
import { getFormattedDate } from 'web-components/src/utils/format';

import Section from 'web-components/src/components/section';
import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import { MainnetLaunchInfoSectionQuery, SanityMainnetActionItem } from '../../generated/graphql';
import SanityImage from 'gatsby-plugin-sanity-image';
import { BlockContent } from 'web-components/src/components/block-content';

const StyledLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: theme.spacing(5),
      borderRadius: 2,
    },
    colorPrimary: {
      backgroundColor: theme.palette.info.light,
    },
    bar: {
      background: 'linear-gradient(81.77deg, rgba(79, 181, 115, 0.7) 0%, rgba(35, 142, 73, 0.7) 73.42%);',
    },
  }),
)(LinearProgress);

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingBottom: theme.spacing(7),
  },
  title: {
    margin: '0 auto',
    fontWeight: 900,
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(10),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(8),
    },
  },
  actionItems: {
    margin: theme.spacing(7, 0),
  },
  image: {
    [theme.breakpoints.up('sm')]: {
      minWidth: '40%',
      maxHeight: '100%',
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: '100%',
      maxHeight: theme.spacing(50),
    },
  },
  card: {
    border: `1px solid ${theme.palette.grey[100]}`,
    borderRadius: '5px',
    margin: theme.spacing(17, 0),
    display: 'flex',
    flex: '1',
    [theme.breakpoints.up('sm')]: {
      flexFlow: 'row nowrap',
    },
    [theme.breakpoints.down('xs')]: {
      flexFlow: 'row wrap',
    },
  },
  cardMain: {
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(10),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(10, 4.5),
    },
  },
  cardTitle: {
    fontFamily: theme.typography.h1.fontFamily,
    fontWeight: 900,
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(8),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(7),
    },
  },
  launchDate: {
    margin: theme.spacing(4, 0),
    fontSize: theme.spacing(5),
    color: theme.palette.info.main,
    fontWeight: 700,
  },
  listText: {
    color: theme.palette.info.dark,
    fontSize: theme.spacing(5),
    lineHeight: '120%',
    '& > ul > li': {
      marginLeft: theme.spacing(5),
      position: 'relative',
      display: 'list-item',
      listStyleType: 'disc',
      listStylePositio: 'inside',
      '&::marker': {
        fontSize: theme.spacing(3),
      },
    },
  },
  progressWrap: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    flexGrow: 1,
  },
  progressText: {
    margin: theme.spacing(11, 0, 4),
    fontFamily: theme.typography.h1.fontFamily,
    color: theme.palette.info.dark,
    textTransform: 'uppercase',
  },
}));

const query = graphql`
  query mainnetLaunchInfoSection {
    sanityMainnetPage {
      launchDate
      launchInfoSection {
        title
        image {
          ...fluidCustomImageFields_withWebp
        }
        cardTitle
        _rawCardBody
        actionItems {
          title
          linkText
          linkUrl
          description
          icon {
            imageAlt
            image {
              ...Image
            }
          }
        }
      }
    }
  }
`;

const LaunchInfoSection: React.FC = () => {
  const { sanityMainnetPage } = useStaticQuery<MainnetLaunchInfoSectionQuery>(query);
  const data = sanityMainnetPage?.launchInfoSection;
  const styles = useStyles();
  return (
    <Section className={styles.root}>
      <Typography variant="h1" className={styles.title}>
        {data?.title}
      </Typography>
      <Grid container justify="center" className={styles.actionItems}>
        {data?.actionItems?.map((item, i) => (
          <ActionItem key={i} {...(item as SanityMainnetActionItem)} />
        ))}
      </Grid>

      <div className={styles.card}>
        <Img className={styles.image} fluid={data?.image?.image?.asset?.fluid as FluidObject} />
        <Grid container direction="column" className={styles.cardMain}>
          <Typography className={styles.cardTitle}>{data?.cardTitle}</Typography>
          <Typography className={styles.launchDate}>
            Release date:{' '}
            {getFormattedDate(sanityMainnetPage?.launchDate, {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </Typography>
          <BlockContent className={styles.listText} content={data?._rawCardBody} />
          <div className={styles.progressWrap}>
            <Typography className={styles.progressText}>100% complete</Typography>
            <StyledLinearProgress variant="determinate" value={100} />
          </div>
        </Grid>
      </div>
    </Section>
  );
};

const useActionItemStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    maxWidth: theme.spacing(90),
    margin: theme.spacing(10, 4),
    [theme.breakpoints.only('md')]: {
      maxWidth: theme.spacing(70),
    },
  },
  img: {
    height: theme.spacing(20),
  },
  title: {
    fontSize: theme.spacing(6),
    margin: theme.spacing(5, 0),
    fontWeight: 900,
  },
  btnWrap: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  btn: {
    fontSize: theme.spacing(4),
    padding: theme.spacing(2, 4),
    marginTop: theme.spacing(5),
  },
  description: {
    color: theme.palette.info.dark,
    fontSize: theme.spacing(4.5),
  },
}));

/**
 * TODO: This is very similar to the `ImageItems` component, and they could probably be consolodated but when I first tried it was creating issues so I opted to re-create
 */
const ActionItem: React.FC<SanityMainnetActionItem> = props => {
  const styles = useActionItemStyles();
  return (
    <div className={styles.root}>
      <SanityImage {...(props.icon?.image as any)} alt={props.icon?.imageAlt} className={styles.img} />
      <Typography variant="h1" className={styles.title}>
        {props.title}
      </Typography>
      <Typography className={styles.description}>{props.description}</Typography>
      <div className={styles.btnWrap}>
        <ContainedButton
          className={styles.btn}
          href={props.linkUrl || ''}
          disabled={!props.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {props.linkUrl ? props.linkText : 'Coming Soon'}
        </ContainedButton>
      </div>
    </div>
  );
};

export default LaunchInfoSection;
