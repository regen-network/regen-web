import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { createStyles, withStyles, makeStyles, Theme, Typography, LinearProgress } from '@material-ui/core';
import Img, { FluidObject } from 'gatsby-image';
import { format } from 'date-fns';
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
  actionWrap: {
    display: 'flex',
    marginBottom: theme.spacing(7),
    justifyContent: 'space-evenly',
    flexFlow: 'row wrap',
  },
  btnWrap: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  imgWrap: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    maxHeight: '100%',
    [theme.breakpoints.up('sm')]: {
      minWidth: '40%',
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: '100%',
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
    padding: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
  },
  cardTitle: {
    fontFamily: theme.typography.h1.fontFamily,
    fontWeight: 900,
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(8),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(8),
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

type QueryData = {
  text: {
    launchDate: string;
    launchInfoSection: {
      image: {
        childImageSharp: {
          fluid: FluidObject;
        };
      };
      card: {
        title: string;
        listTitle: string;
        progress: number;
        listItems: string[];
        actionItems: ActionItem[];
      };
    };
  };
};

const LaunchInfoSection: React.FC = () => {
  const {
    text: {
      launchDate,
      launchInfoSection: { card, image },
    },
  } = useStaticQuery<QueryData>(graphql`
    query {
      text: mainnetYaml {
        launchDate
        launchInfoSection {
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
            listItems
            actionItems {
              title
              linkUrl
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
      <div className={classes.actionWrap}>
        {card.actionItems.map((item, i) => (
          <ActionItem key={i} {...item} />
        ))}
      </div>

      <div className={classes.card}>
        <Img className={classes.image} fluid={image.childImageSharp.fluid} />
        <div className={classes.cardMain}>
          <Typography className={classes.cardTitle}>{card.title}</Typography>
          <Typography className={classes.launchDate}>
            Release date: {format(new Date(launchDate), 'MMMM Y')}
          </Typography>
          <Typography className={classes.listText}>{card.listTitle}</Typography>
          {card.listItems.map((item, i) => (
            <Typography key={i} className={clsx(classes.listText, classes.listItem)}>
              {item}
            </Typography>
          ))}
          <div className={classes.progressWrap}>
            <Typography className={classes.progressText}>{card.progress}% complete</Typography>
            <StyledLinearProgress variant="determinate" value={card.progress} />
          </div>
        </div>
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
    maxWidth: theme.spacing(70),
    margin: theme.spacing(4),
  },
  img: {
    minWidth: '100%',
    height: theme.spacing(20),
  },
  title: {
    fontSize: theme.spacing(6),
    margin: theme.spacing(5, 0),
  },
  btnWrap: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  btn: {
    fontSize: theme.spacing(3.5),
    padding: theme.spacing(2, 4),
    marginTop: theme.spacing(5),
  },
  description: {
    color: theme.palette.info.dark,
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
        <ContainedButton className={classes.btn} href={p.linkURL} target="_blank" rel="noopener noreferrer">
          {p.linkText}
        </ContainedButton>
      </div>
    </div>
  );
};

export default LaunchInfoSection;
