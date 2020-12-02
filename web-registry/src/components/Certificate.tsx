import React, { useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';

import Certificate from 'web-components/lib/components/certificate';
import Title from 'web-components/lib/components/title';
import ResponsiveSlider from 'web-components/lib/components/sliders/ResponsiveSlider';
import ShareIcons from 'web-components/lib/components/icons/ShareIcons';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';

import background from '../assets/certificate-bg.png';
import pageBackground from '../assets/certificate-page-bg.jpg';

const useStyles = makeStyles((theme: Theme) => ({
  background: {
    backgroundImage: `url("${pageBackground}")`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  },
  certificate: {
    margin: '0 auto',
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(41.25),
      paddingRight: theme.spacing(60),
      paddingLeft: theme.spacing(60),
    },
    [theme.breakpoints.up('xl')]: {
      maxWidth: theme.spacing(236),
      paddingRight: 0,
      paddingLeft: 0,
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(10),
      paddingRight: theme.spacing(4),
      paddingLeft: theme.spacing(4),
    },
  },
  share: {
    margin: '0 auto',
    [theme.breakpoints.up('sm')]: {
      // paddingTop: theme.spacing(41.25),
      paddingRight: theme.spacing(60),
      paddingLeft: theme.spacing(60),
    },
    [theme.breakpoints.up('xl')]: {
      maxWidth: theme.spacing(236),
      paddingRight: 0,
      paddingLeft: 0,
    },
    [theme.breakpoints.down('xs')]: {
      // paddingTop: theme.spacing(10),
      paddingRight: theme.spacing(10),
      paddingLeft: theme.spacing(10),
    },
  },
}));

const PURCHASE_BY_STRIPE_ID = loader('../graphql/PurchaseByStripeId.graphql');

function getName(obj?: { name: string }): string {
  return obj ? obj.name : '';
}

function getRole(obj?: { roles?: string[] }): string {
  return obj && obj.roles && obj.roles.length ? obj.roles[0] : '';
}

export default function CertificatePage(): JSX.Element {
  const classes = useStyles();
  const searchParams = new URLSearchParams(window.location.search);
  const stripeId = searchParams.get('stripeId');

  const { data } = useQuery(PURCHASE_BY_STRIPE_ID, {
    errorPolicy: 'ignore',
    variables: { stripeId },
  });

  let items: JSX.Element[] = [];
  if (data && data.allPurchases && data.allPurchases.nodes) {
    items = data.allPurchases.nodes.map((node: any) => {
      const units: number = node.transactionsByPurchaseId.nodes
        .map((n: { units: string }) => parseFloat(n.units))
        .reduce((accumulator: number, currentValue: number) => accumulator + currentValue);
      const projectDeveloper = node.creditVintageByCreditVintageId.projectByProjectId.partyByDeveloperId;
      const projectDeveloperPerson =
        projectDeveloper.organizationsByPartyId.nodes.length &&
        projectDeveloper.organizationsByPartyId.nodes[0].organizationMembersByOrganizationId.nodes.length &&
        projectDeveloper.organizationsByPartyId.nodes[0].organizationMembersByOrganizationId.nodes[0]
          .userByMemberId.partyByPartyId;

      const issuer =
        node.creditVintageByCreditVintageId.walletByIssuerId.partiesByWalletId.nodes.length &&
        node.creditVintageByCreditVintageId.walletByIssuerId.partiesByWalletId.nodes[0];
      const issuerPerson =
        issuer &&
        issuer.organizationsByPartyId &&
        issuer.organizationsByPartyId.nodes.length &&
        issuer.organizationsByPartyId.nodes[0].organizationMembersByOrganizationId &&
        issuer.organizationsByPartyId.nodes[0].organizationMembersByOrganizationId.nodes.length &&
        issuer.organizationsByPartyId.nodes[0].organizationMembersByOrganizationId.nodes[0].userByMemberId
          .partyByPartyId;

      const creditClassVersion =
        node.creditVintageByCreditVintageId.creditClassByCreditClassId.creditClassVersionsById.nodes.length &&
        node.creditVintageByCreditVintageId.creditClassByCreditClassId.creditClassVersionsById.nodes[0];

      return (
        <Certificate
          background={background}
          creditName={getName(creditClassVersion)}
          creditsUnits={units}
          equivalentTonsCO2={units} // 1 credit <=> 1 ton CO2e for now
          buyerName={
            node.walletByBuyerWalletId.partiesByWalletId.nodes.length
              ? node.walletByBuyerWalletId.partiesByWalletId.nodes[0].name
              : ''
          }
          date={node.createdAt}
          issuer={{
            companyName: getName(issuer),
            personName: getName(issuerPerson),
            personRole: getRole(issuerPerson),
          }}
          projectDeveloper={{
            companyName: projectDeveloper.name,
            personName: getName(projectDeveloperPerson),
            personRole: getRole(projectDeveloperPerson),
          }}
          // TODO replace with db data
          verifier={{
            companyName: 'RSM Australia Pty Ltd',
            personName: 'Tim Pittaway',
            personRole: 'Partner',
          }}
        />
      );
    });
  }

  return (
    <>
      <div className={classes.background}>
        {data && data.allPurchases && data.allPurchases.nodes && (
          <>
            <div className={classes.certificate}>
              <ResponsiveSlider slidesToShow={1} items={items} dots />
            </div>
          </>
        )}
      </div>
      <Grid container className={classes.share}>
        <Grid item xs={12} sm={6}>
          <Title variant="h4">Share</Title>
          <ShareIcons url={`${window.location.origin}/buyers`} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <OutlinedButton>print certificate</OutlinedButton>
        </Grid>
      </Grid>
    </>
  );
}
