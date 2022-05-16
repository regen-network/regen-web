import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Grid } from '@mui/material';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';

import { Theme } from 'web-components/lib/theme/muiTheme';
import Section from 'web-components/lib/components/section';
import GreenCard from 'web-components/lib/components/cards/GreenCard';
import { Body, Label, Title } from 'web-components/lib/components/typography';
import ShareIcons from 'web-components/lib/components/icons/ShareIcons';

import sum from '../lib/sum';
import CowIllustration from '../assets/cow-illustration.png';

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
  card: {
    backgroundColor: theme.palette.primary.main,
  },
}));

function GridItem({
  label,
  value,
}: {
  label: string;
  value: any;
}): JSX.Element {
  return (
    <Grid container alignItems="center" sx={{ pt: [2.5, 0] }}>
      <Grid item xs={12} md={6}>
        <Label size="sm" color="info.main">
          {label}
        </Label>
      </Grid>
      <Grid item xs={12} md={6}>
        <Body
          size="lg"
          color="primary.contrastText"
          sx={{ lineHeight: '260%' }}
        >
          {value}
        </Body>
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
      <Section sx={{ root: { pt: [7.5, 11.25], pb: 5 } }}>
        <Box sx={{ textAlign: 'center' }}>
          <img src={CowIllustration} alt={CowIllustration} />
          <Title align="center" variant="h2" sx={{ py: { xs: 3.5, sm: 5 } }}>
            Thank you for your purchase!
          </Title>
          {projectData && projectData.projectByHandle && (
            <Body size="xl" mobileSize="md" pb={[6, 8.75]}>
              {projectData.projectByHandle.metadata.thanksTagline}
            </Body>
          )}
        </Box>
        {projectData &&
          projectData.projectByHandle &&
          walletData &&
          walletData.walletById && (
            <GreenCard className={classes.card}>
              <Grid
                container
                sx={{ flexDirection: { xs: 'column-reverse', md: 'row' } }}
              >
                <Grid item xs={12} md={6}>
                  <Title
                    variant="h3"
                    sx={{ pb: { xs: 4, sm: 7 }, pt: { xs: 5, md: 0 } }}
                  >
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
          <Box sx={{ textAlign: 'center', pt: 17.75, pb: 20 }}>
            <Title variant="h4" align="center">
              Share this project
            </Title>
            <Body size="lg" align="center" sx={{ pb: 5, pt: 3 }}>
              {projectData.projectByHandle.metadata.shareTagline}
            </Body>
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
          </Box>
        )}
      </Section>
    </>
  );
}

export { PostPurchase };
