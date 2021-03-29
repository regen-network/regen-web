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
import clsx from 'clsx';

import Section from 'web-components/src/components/section';
import ContainedButton from 'web-components/src/components/buttons/ContainedButton';

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
  listItem: {
    marginLeft: theme.spacing(5),
    position: 'relative',
    display: 'list-item',
    listStyleType: 'disc',
    listStylePositio: 'inside',
    '&::marker': {
      fontSize: theme.spacing(3),
    },
  },
  listText: {
    color: theme.palette.info.dark,
    fontSize: theme.spacing(5),
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

type ActionItem = {
  title: string;
  description: string;
  linkText: string;
  linkURL: string;
  icon: {
    publicURL: string;
  };
};

type ListItem = {
  text: string;
};

type QueryData = {
  text: {
    launchDate: string;
    launchInfoSection: {
      title: string;
      image: {
        childImageSharp: {
          fluid: FluidObject;
        };
      };
      card: {
        title: string;
        listTitle: string;
        progress: number;
        listItems: ListItem[];
        actionItems: ActionItem[];
      };
    };
  };
};

const LaunchInfoSection: React.FC = () => {
  const {
    text: {
      launchDate,
      launchInfoSection: { card, image, title },
    },
  } = useStaticQuery<QueryData>(graphql`
    query {
      text: mainnetYaml {
        launchDate
        launchInfoSection {
          title
          image {
            childImageSharp {
              fluid(quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          card {
            title
            listTitle
            progress
            listItems {
              text
            }
            actionItems {
              title
              linkURL
              linkText
              description
              icon {
                extension
                publicURL
              }
            }
          }
        }
      }
    }
  `);
  const classes = useStyles();
  return (
    <Section className={classes.root}>
      <Typography variant="h1" className={classes.title}>
        {title}
      </Typography>
      <Grid container justify="center" className={classes.actionItems}>
        {card.actionItems.map((item, i) => (
          <ActionItem key={i} {...item} />
        ))}
      </Grid>

      <div className={classes.card}>
        <Img className={classes.image} fluid={image.childImageSharp.fluid} />
        <Grid container direction="column" className={classes.cardMain}>
          <Typography className={classes.cardTitle}>{card.title}</Typography>
          <Typography className={classes.launchDate}>
            Release date: {getFormattedDate(launchDate, { month: 'long', year: 'numeric' })}
          </Typography>
          <Typography className={classes.listText}>{card.listTitle}</Typography>
          {card.listItems.map((item, i) => (
            <Typography key={i} className={clsx(classes.listText, classes.listItem)}>
              {item.text}
            </Typography>
          ))}
          <div className={classes.progressWrap}>
            <Typography className={classes.progressText}>{card.progress}% complete</Typography>
            <StyledLinearProgress variant="determinate" value={card.progress} />
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
    minWidth: '100%',
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
const ActionItem: React.FC<ActionItem> = p => {
  const classes = useActionItemStyles();
  return (
    <div className={classes.root}>
      <img src={p.icon.publicURL} alt={p.description} className={classes.img} />
      <Typography variant="h1" className={classes.title}>
        {p.title}
      </Typography>
      <Typography className={classes.description}>{p.description}</Typography>
      <div className={classes.btnWrap}>
        <ContainedButton
          className={classes.btn}
          href={p.linkURL}
          disabled={!p.linkURL}
          target="_blank"
          rel="noopener noreferrer"
        >
          {p.linkURL ? p.linkText : 'Coming Soon'}
        </ContainedButton>
      </div>
    </div>
  );
};

export default LaunchInfoSection;
