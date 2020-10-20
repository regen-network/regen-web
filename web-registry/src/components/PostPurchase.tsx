import React, { useState } from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';

import Section from 'web-components/lib/components/section';
import GreenCard from 'web-components/lib/components/cards/GreenCard';
import Description from 'web-components/lib/components/description';
import Title from 'web-components/lib/components/title';
import TwitterIcon from 'web-components/lib/components/icons/social/TwitterIcon';
import FacebookIcon from 'web-components/lib/components/icons/social/FacebookIcon';
import LinkedInIcon from 'web-components/lib/components/icons/social/LinkedInIcon';
import TelegramIcon from 'web-components/lib/components/icons/social/TelegramIcon';
import LinkIcon from 'web-components/lib/components/icons/LinkIcon';
import Banner from 'web-components/lib/components/banner';
import sum from '../lib/sum';
import copyTextToClipboard from '../lib/copy';

const PROJECT = gql`
  query ProjectByHandle($handle: String!) {
    projectByHandle(handle: $handle) {
      id
      name
      metadata
      image
      creditClassByCreditClassId {
        creditClassVersionsById(last: 1) {
          nodes {
            name
          }
        }
      }
    }
  }
`;

const WALLET = gql`
  query WalletById($id: UUID!) {
    walletById(id: $id) {
      id
      purchasesByBuyerWalletId(orderBy: CREATED_AT_DESC, first: 1) {
        nodes {
          id
          createdAt
          transactionsByPurchaseId {
            nodes {
              units
              creditPrice
            }
          }
        }
      }
    }
  }
`;

interface PostPurchaseProps {
  creditUnits: number;
  price: number;
  date: string | Date;
  owner: string;
  transactionId: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  image: {
    width: '100%',
    borderRadius: '10px',
  },
  label: {
    fontFamily: theme.typography.h1.fontFamily,
    color: theme.palette.info.main,
    fontWeight: 800,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(3.5),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3),
    },
  },
  value: {
    color: theme.palette.primary.contrastText,
    lineHeight: '260%',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(4),
    },
  },
  description: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(5.5),
      paddingBottom: theme.spacing(8.75),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(4),
      paddingBottom: theme.spacing(6),
    },
  },
  center: {
    textAlign: 'center',
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(3.5),
      paddingBottom: theme.spacing(3.5),
    },
  },
  cardTitle: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(7),
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(5),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(4),
    },
  },
  grid: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
    },
  },
  share: {
    textAlign: 'center',
    paddingTop: theme.spacing(17.75),
    paddingBottom: theme.spacing(20),
  },
  shareDescription: {
    lineHeight: '150%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(5),
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(4),
    },
  },
  section: {
    paddingBottom: theme.spacing(5),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(11.25),
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(7.5),
    },
  },
  card: {
    backgroundColor: theme.palette.primary.main,
  },
  iconContainer: {
    backgroundColor: theme.palette.secondary.dark,
    borderRadius: '50%',
    display: 'block',
    width: theme.spacing(12.5),
    height: theme.spacing(12.5),
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
    '& svg': {
      color: 'transparent',
      width: '100%',
      height: '100%',
    },
  },
  small: {
    padding: theme.spacing(2),
  },
  gridItem: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(2.5),
    },
  }
}));

function GridItem({ label, value }: { label: string; value: any }): JSX.Element {
  const classes = useStyles();
  return (
    <Grid container alignItems="center" className={classes.gridItem}>
      <Grid className={classes.label} item xs={12} md={6}>
        {label}
      </Grid>
      <Grid item xs={12} md={6}>
        <Description className={classes.value}>{value}</Description>
      </Grid>
    </Grid>
  );
}

export default function PostPurchase(): JSX.Element {
  const classes = useStyles();
  const theme = useTheme();
  const [copied, setCopied] = useState(false);
  let { walletId, projectId, name } = useParams<{ walletId: string; projectId: string; name: string }>();
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const shareTwitterText: string =
    'Just purchased credits on Regen Registry! CarbonPlus credits help to meet %23climatechange goals, support %23farmers and restore %23ecosystems. Join us and take %23climateaction @regen_network - open marketplace for climate solutions. Learn more:';
  const shareTelegramText: string =
    'Just purchased credits on Regen Registry! CarbonPlus credits help to meet climate change goals, support farmers and restore ecosystems. Join us and take climateaction https://t.me/regennetwork_public - open marketplace for climate solutions.';

  const { data: projectData } = useQuery(PROJECT, {
    errorPolicy: 'ignore',
    variables: { handle: projectId },
  });

  const { data: walletData } = useQuery(WALLET, {
    errorPolicy: 'ignore',
    variables: { id: walletId },
  });

  const url: string =
    process.env.NODE_ENV === 'production'
      ? `${window.location.origin}/registry/projects/${projectId}`
      : `${window.location.origin}/projects/${projectId}`;

  const units: number | undefined = walletData && walletData.walletById && sum(
    walletData.walletById.purchasesByBuyerWalletId.nodes[0].transactionsByPurchaseId.nodes,
    'units',
  );

  return (
    <>
      <Section className={classes.section}>
        <div className={classes.center}>
          <img
            src={require('../assets/cow-illustration.png')}
            alt={require('../assets/cow-illustration.png')}
          />
          <Title className={classes.title} align="center" variant="h2">
            Thank you for your purchase!
          </Title>
          {projectData && projectData.projectByHandle && (
            <Description className={classes.description}>
              {projectData.projectByHandle.metadata.thanksTagline}
            </Description>
          )}
        </div>
        {projectData && projectData.projectByHandle && walletData && walletData.walletById && (
          <GreenCard className={classes.card}>
            <Grid container className={classes.grid}>
              <Grid item xs={12} md={6}>
                <Title className={classes.cardTitle} variant="h3">
                  Order summary
                </Title>
                <GridItem
                  label="credit"
                  value={ReactHtmlParser(
                    projectData.projectByHandle.creditClassByCreditClassId.creditClassVersionsById.nodes[0]
                      .name,
                  )}
                />
                <GridItem label="project" value={<a href={url}>{projectData.projectByHandle.name}</a>} />
                <GridItem
                  label="# of credits"
                  value={units}
                />
                <GridItem
                  label="total price"
                  value={`$${new Intl.NumberFormat('en-US', {
                    minimumFractionDigits: 2,
                  }).format(
                    walletData.walletById.purchasesByBuyerWalletId.nodes[0].transactionsByPurchaseId.nodes[0]
                      .creditPrice * units,
                  )} USD`}
                />
                <GridItem
                  label="date"
                  value={new Date(
                    walletData.walletById.purchasesByBuyerWalletId.nodes[0].createdAt,
                  ).toLocaleDateString('en-US', options)}
                />
                <GridItem label="owner" value={name} />
                <GridItem
                  label="transaction id"
                  value={walletData.walletById.purchasesByBuyerWalletId.nodes[0].id.slice(0, 8)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <img
                  className={classes.image}
                  alt={projectData.projectByHandle.image}
                  src={projectData.projectByHandle.image}
                />
              </Grid>
            </Grid>
          </GreenCard>
        )}
        {projectData && projectData.projectByHandle && (
          <div className={classes.share}>
            <Title variant="h4" align="center">
              Share this project
            </Title>
            <Description className={classes.shareDescription}>
              {projectData.projectByHandle.metadata.shareTagline}
            </Description>
            <Grid container justify="center" spacing={4}>
              <Grid item>
                <a
                  href={`https://twitter.com/intent/tweet?url=${url}&text=${shareTwitterText}`}
                  rel="noopener noreferrer"
                  target="_blank"
                  className={classes.iconContainer}
                >
                  <TwitterIcon color={theme.palette.primary.main} hoverColor={theme.palette.secondary.main} />
                </a>
              </Grid>
              <Grid item>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
                  rel="noopener noreferrer"
                  target="_blank"
                  className={classes.iconContainer}
                >
                  <FacebookIcon
                    color={theme.palette.primary.main}
                    hoverColor={theme.palette.secondary.main}
                  />
                </a>
              </Grid>
              <Grid item>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
                  rel="noopener noreferrer"
                  target="_blank"
                  className={classes.iconContainer}
                >
                  <LinkedInIcon
                    color={theme.palette.primary.main}
                    hoverColor={theme.palette.secondary.main}
                  />
                </a>
              </Grid>
              <Grid item>
                <a
                  href={`https://t.me/share/url?url=${url}&text=${shareTelegramText}`}
                  rel="noopener noreferrer"
                  target="_blank"
                  className={classes.iconContainer}
                >
                  <TelegramIcon
                    color={theme.palette.primary.main}
                    hoverColor={theme.palette.secondary.main}
                  />
                </a>
              </Grid>
              <Grid item>
                <div
                  onClick={() => copyTextToClipboard(url).then(() => setCopied(true))}
                  className={classes.iconContainer}
                >
                  <LinkIcon
                    className={classes.small}
                    color={theme.palette.primary.main}
                    hoverColor={theme.palette.secondary.main}
                  />
                </div>
              </Grid>
            </Grid>
          </div>
        )}
      </Section>
      <div
        onClick={() => copyTextToClipboard(url).then(() => setCopied(true))}
        className={classes.iconContainer}
      >
        <LinkIcon
          className={classes.small}
          color={theme.palette.primary.main}
          hoverColor={theme.palette.secondary.main}
        />
      </div>
      {copied && <Banner text="Link copied to your clipboard" />}
    </>
  );
}
