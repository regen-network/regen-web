import React, { useRef, useState } from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import ReactToPrint from 'react-to-print';

import getRegistryUrl from '../lib/registryUrl';
import Certificate from 'web-components/lib/components/certificate';
import Title from 'web-components/lib/components/title';
import ResponsiveSlider from 'web-components/lib/components/sliders/ResponsiveSlider';
import ShareIcons from 'web-components/lib/components/icons/ShareIcons';
import PrintIcon from 'web-components/lib/components/icons/PrintIcon';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import Section from 'web-components/lib/components/section';
import ProjectCard from 'web-components/lib/components/cards/ProjectCard';

import background from '../assets/certificate-bg.png';
import pageBackground from '../assets/certificate-page-bg.jpg';
import projectsBackground from '../assets/certificate-projects-bg.jpg';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
  },
  background: {
    backgroundImage: `url("${pageBackground}") !important`,
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
  slider: {
    '& .slick-dots': {
      [theme.breakpoints.up('sm')]: {
        height: theme.spacing(16),
        paddingTop: theme.spacing(7),
      },
      [theme.breakpoints.down('xs')]: {
        height: theme.spacing(12),
        paddingTop: theme.spacing(6),
      },
    },
    '& .slick-list': {
      overflow: 'hidden',
    },
    '& .slick-track': {
      '& .slick-slide': {
        paddingRight: 0,
      },
    },
  },
  share: {
    margin: '0 auto',
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(21.25),
      paddingBottom: theme.spacing(23),
      paddingRight: theme.spacing(60),
      paddingLeft: theme.spacing(60),
    },
    [theme.breakpoints.up('xl')]: {
      maxWidth: theme.spacing(236),
      paddingRight: 0,
      paddingLeft: 0,
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(17.5),
      paddingBottom: theme.spacing(20),
      paddingRight: theme.spacing(10),
      paddingLeft: theme.spacing(10),
    },
  },
  shareTitle: {
    paddingBottom: theme.spacing(3.75),
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
  printButton: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
      height: theme.spacing(14.75),
      paddingLeft: theme.spacing(7.5),
      paddingRight: theme.spacing(7.5),
      float: 'right',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3.5),
      height: theme.spacing(10),
      marginTop: theme.spacing(7.5),
      paddingLeft: theme.spacing(10.5),
      paddingRight: theme.spacing(10.5),
      width: '100%',
    },
  },
  projects: {
    paddingBottom: theme.spacing(20),
    backgroundImage: `url("${projectsBackground}")`,
    backgroundRepeat: 'no-repeat',
  },
  projectsTitle: {
    textAlign: 'left',
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(10),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(5.25),
      paddingBottom: theme.spacing(8),
    },
  },
  icon: {
    marginRight: theme.spacing(1.5),
  },
}));

const PURCHASES_BY_STRIPE_ID = loader('../graphql/PurchasesByStripeId.graphql');
const PURCHASES_BY_BUYER_WALLET_ID = loader('../graphql/PurchasesByBuyerWalletId.graphql');

function getName(obj?: { name: string }): string {
  return obj ? obj.name : '';
}

function getRole(obj?: { roles?: string[] }): string {
  return obj && obj.roles && obj.roles.length ? obj.roles[0] : '';
}

export default function CertificatePage(): JSX.Element {
  const classes = useStyles();
  const theme = useTheme();
  const [current, setCurrent] = useState<number>(0);

  const searchParams = new URLSearchParams(window.location.search);
  const stripeId = searchParams.get('stripeId');
  const buyerWalletId = searchParams.get('id');

  const ref = useRef<Array<HTMLDivElement | null>>([]);

  const { data: dataByStripeId } = useQuery(PURCHASES_BY_STRIPE_ID, {
    skip: !stripeId,
    errorPolicy: 'ignore',
    variables: { stripeId },
  });

  const { data: dataByBuyerWalletId } = useQuery(PURCHASES_BY_BUYER_WALLET_ID, {
    skip: !buyerWalletId,
    errorPolicy: 'ignore',
    variables: { buyerWalletId },
  });

  let data;
  if (stripeId) {
    data = dataByStripeId;
  } else if (buyerWalletId) {
    data = dataByBuyerWalletId;
  }

  let items: JSX.Element[] = [];
  let projects: JSX.Element[] = [];
  if (data && data.allPurchases && data.allPurchases.nodes) {
    const nodes = data.allPurchases.nodes;
    for (let i = 0; i < nodes.length; i++) {
      const node = data.allPurchases.nodes[i];

      const units: number = node.transactionsByPurchaseId.nodes
        .map((n: { units: string }) => parseFloat(n.units))
        .reduce((accumulator: number, currentValue: number) => accumulator + currentValue);

      const vintage = node.creditVintageByCreditVintageId;
      const project = vintage.projectByProjectId;
      const landOwner = project.partyByLandOwnerId;
      const landOwnerPerson =
        landOwner &&
        landOwner.organizationByPartyId &&
        landOwner.organizationByPartyId.organizationMembersByOrganizationId.nodes.length &&
        landOwner.organizationByPartyId.organizationMembersByOrganizationId.nodes[0].userByMemberId
          .partyByPartyId;

      const issuer =
        vintage.walletByIssuerId.partiesByWalletId.nodes.length &&
        vintage.walletByIssuerId.partiesByWalletId.nodes[0];

      const creditClassVersion =
        project.creditClassVersionByCreditClassVersionIdAndCreditClassVersionCreatedAt;
      const methodologyVersion =
        project.methodologyVersionByMethodologyVersionIdAndMethodologyVersionCreatedAt;

      items.push(
        <div
          ref={element => {
            if (element && ref && ref.current && ref.current.length < nodes.length) {
              ref.current.push(element);
            }
          }}
        >
          <Certificate
            background={background}
            creditName={getName(creditClassVersion)}
            creditsUnits={units}
            equivalentTonsCO2={units} // TODO replace with db data (1 credit <=> 1 ton CO2e for now)
            buyerName={
              node.walletByBuyerWalletId.partiesByWalletId.nodes.length
                ? node.walletByBuyerWalletId.partiesByWalletId.nodes[0].name
                : ''
            }
            date={node.createdAt}
            issuer={{
              companyName: getName(issuer),
              personName: 'Christian Shearer',
              personRole: 'CEO',
            }}
            issuee={{
              companyName: landOwner?.name,
              personName: getName(landOwnerPerson),
              personRole: getRole(landOwnerPerson),
            }}
            // TODO add retirement info
            // retired={}
            // TODO replace with db data once we have verifier data
            // verifier={{
            //   companyName: 'RSM Australia Pty Ltd',
            //   personName: 'Tim Pittaway',
            //   personRole: 'Partner',
            // }}
          />
        </div>,
      );

      projects.push(
        <ProjectCard
          href={getRegistryUrl(`/projects/${project.handle}`)}
          name={project.name}
          imgSrc={project.image}
          place={project.addressByAddressId.feature ? project.addressByAddressId.feature.place_name : ''}
          area={project.area}
          areaUnit={project.areaUnit}
          purchaseInfo={{
            units,
            vintageId: vintage.id,
            vintagePeriod: `${new Date(vintage.startDate).getFullYear()}-${new Date(
              vintage.endDate,
            ).getFullYear()}`,
            creditClass: {
              id: creditClassVersion?.creditClassById.handle,
              name: creditClassVersion?.name,
              version: creditClassVersion?.version,
            },
            methodology: {
              id: methodologyVersion?.methodologyById.handle,
              name: methodologyVersion?.name,
              version: methodologyVersion?.version,
            },
            programGuide: {
              id: creditClassVersion?.metadata?.programGuide?.handle,
              version: creditClassVersion?.metadata?.programGuide?.version,
            },
            projectType: project.type,
          }}
        />,
      );
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.background}>
        {data && data.allPurchases && data.allPurchases.nodes && (
          <>
            <div className={classes.certificate}>
              <ResponsiveSlider
                className={classes.slider}
                slidesToShow={1}
                items={items}
                padding={theme.spacing(0)}
                itemWidth="100%"
                onChange={(i: number) => setCurrent(i)}
                dots
              />
            </div>
          </>
        )}
      </div>
      <Grid container className={classes.share} alignItems="flex-end">
        <Grid item xs={12} sm={6}>
          <Title className={classes.shareTitle} variant="h4">
            Share
          </Title>
          <ShareIcons xsSize={theme.spacing(10)} url={`${window.location.origin}/buyers`} />
        </Grid>
        {data && data.allPurchases && data.allPurchases.nodes && (
          <Grid item xs={12} sm={6}>
            <ReactToPrint
              trigger={() => (
                <OutlinedButton className={classes.printButton}>
                  <PrintIcon className={classes.icon} /> print certificate
                </OutlinedButton>
              )}
              content={() => ref.current[current]}
            />
          </Grid>
        )}
      </Grid>
      {data && data.allPurchases && data.allPurchases.nodes && (
        <div className={classes.projects}>
          <Section titleClassName={classes.projectsTitle} title="Projects Supported">
            <Grid container spacing={5}>
              {projects.map((project, i) => (
                <Grid item xs={12} sm={4} key={i}>
                  {project}
                </Grid>
              ))}
            </Grid>
          </Section>
        </div>
      )}
    </div>
  );
}
