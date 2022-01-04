import React from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';

import { Theme } from 'web-components/lib/theme/muiTheme';
import Section from 'web-components/lib/components/section';
import GreenCard from 'web-components/lib/components/cards/GreenCard';
import Description from 'web-components/lib/components/description';
import Title from 'web-components/lib/components/title';
import ShareIcons from 'web-components/lib/components/icons/ShareIcons';

import sum from '../lib/sum';

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
            metadata
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
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(3),
    },
  },
  value: {
    color: theme.palette.primary.contrastText,
    lineHeight: '260%',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(4),
    },
  },
  description: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(5.5),
      paddingBottom: theme.spacing(8.75),
    },
    [theme.breakpoints.down('sm')]: {
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
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(3.5),
      paddingBottom: theme.spacing(3.5),
    },
  },
  cardTitle: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(7),
    },
    [theme.breakpoints.down('md')]: {
      paddingTop: theme.spacing(5),
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(4),
    },
  },
  grid: {
    [theme.breakpoints.down('md')]: {
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
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(4),
    },
  },
  section: {
    paddingBottom: theme.spacing(5),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(11.25),
    },
    [theme.breakpoints.down('sm')]: {
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
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(2.5),
    },
  },
}));

function GridItem({
  label,
  value,
}: {
  label: string;
  value: any;
}): JSX.Element {
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

function PostPurchase(): JSX.Element {
  const classes = useStyles();
  let { walletId, projectId, name } = useParams();
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  const { data: projectData } = useQuery(PROJECT, {
    errorPolicy: 'ignore',
    variables: { handle: projectId },
  });

  const { data: walletData } = useQuery(WALLET, {
    errorPolicy: 'ignore',
    variables: { id: walletId },
  });

  const url: string = `projects/${projectId}`;

  const units: number | undefined =
    walletData &&
    walletData.walletById &&
    sum(
      walletData.walletById.purchasesByBuyerWalletId.nodes[0]
        .transactionsByPurchaseId.nodes,
      'units',
    );

  return (
    <>
      <Section classes={{ root: classes.section }}>
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
        {projectData &&
          projectData.projectByHandle &&
          walletData &&
          walletData.walletById && (
            <GreenCard className={classes.card}>
              <Grid container className={classes.grid}>
                <Grid item xs={12} md={6}>
                  <Title className={classes.cardTitle} variant="h3">
                    Order summary
                  </Title>
                  <GridItem
                    label="credit"
                    value={ReactHtmlParser(
                      projectData.projectByHandle.creditClassByCreditClassId
                        .creditClassVersionsById.nodes[0].name,
                    )}
                  />
                  <GridItem
                    label="project"
                    value={<a href={url}>{projectData.projectByHandle.name}</a>}
                  />
                  <GridItem label="# of credits" value={units} />
                  {units && (
                    <GridItem
                      label="total price"
                      value={`$${new Intl.NumberFormat('en-US', {
                        minimumFractionDigits: 2,
                      }).format(
                        walletData.walletById.purchasesByBuyerWalletId.nodes[0]
                          .transactionsByPurchaseId.nodes[0].creditPrice *
                          units,
                      )} USD`}
                    />
                  )}
                  <GridItem
                    label="date"
                    value={new Date(
                      walletData.walletById.purchasesByBuyerWalletId.nodes[0].createdAt,
                    ).toLocaleDateString('en-US', options)}
                  />
                  <GridItem label="owner" value={name} />
                  <GridItem
                    label="transaction id"
                    value={walletData.walletById.purchasesByBuyerWalletId.nodes[0].id.slice(
                      0,
                      8,
                    )}
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
            <ShareIcons
              url={url}
              telegramShare={
                projectData.projectByHandle.creditClassByCreditClassId
                  .creditClassVersionsById.nodes[0].metadata.telegramShare
              }
              twitterShare={
                projectData.projectByHandle.creditClassByCreditClassId
                  .creditClassVersionsById.nodes[0].metadata.twitterShare
              }
            />
          </div>
        )}
      </Section>
    </>
  );
}

export { PostPurchase };
