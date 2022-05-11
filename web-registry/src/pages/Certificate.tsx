import React, { useRef, useState } from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import Grid from '@mui/material/Grid';
import ReactToPrint from 'react-to-print';

import { Theme } from 'web-components/lib/theme/muiTheme';
import Certificate, {
  StakeholderInfo,
} from 'web-components/lib/components/certificate';
import { Title } from 'web-components/lib/components/typography';
import ResponsiveSlider from 'web-components/lib/components/sliders/ResponsiveSlider';
import ShareIcons from 'web-components/lib/components/icons/ShareIcons';
import PrintIcon from 'web-components/lib/components/icons/PrintIcon';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import Section from 'web-components/lib/components/section';
import ProjectCard from 'web-components/lib/components/cards/ProjectCard';
import UserAvatar from 'web-components/lib/components/user/UserAvatar';
import { getFormattedPeriod } from 'web-components/lib/utils/format';

import {
  useAllPurchasesByStripeIdQuery,
  useAllPurchasesByWalletIdQuery,
  Maybe,
  ProjectPartyFragment,
} from '../generated/graphql';
import { qudtUnit, qudtUnitMap } from '../lib/rdf';

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
    },
    [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing(60),
      paddingLeft: theme.spacing(60),
    },
    [theme.breakpoints.between(theme.breakpoints.values.tablet, 'lg')]: {
      paddingRight: theme.spacing(30),
      paddingLeft: theme.spacing(30),
    },
    [theme.breakpoints.up('xl')]: {
      maxWidth: theme.spacing(236),
      paddingRight: 0,
      paddingLeft: 0,
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(10),
    },
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
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
      [theme.breakpoints.down('sm')]: {
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
        '& > div': {
          width: '100%',
        },
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
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(9.25),
      paddingBottom: theme.spacing(20),
      paddingRight: theme.spacing(10),
      paddingLeft: theme.spacing(10),
    },
  },
  shareTitle: {
    paddingBottom: theme.spacing(3.75),
    [theme.breakpoints.down('sm')]: {
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
    [theme.breakpoints.down('sm')]: {
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
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(5.25),
      paddingBottom: theme.spacing(8),
    },
  },
  icon: {
    marginRight: theme.spacing(1.5),
  },
  issuer: {
    margin: '0 auto',
    textAlign: 'center',
    '& img': {
      objectFit: 'contain',
    },
  },
  issuerInfo: {
    paddingBottom: theme.spacing(4.25),
    paddingTop: theme.spacing(4),
  },
  issuanceButton: {
    marginRight: theme.spacing(1.25),
  },
  projectPageButton: {
    marginLeft: theme.spacing(1.25),
  },
}));

function CertificatePage(): JSX.Element {
  const classes = useStyles();
  const theme = useTheme();
  const [current, setCurrent] = useState<number>(0);

  const searchParams = new URLSearchParams(window.location.search);
  const stripeId = searchParams.get('stripeId');
  const buyerWalletId = searchParams.get('id');

  const ref = useRef<Array<HTMLDivElement | null>>([]);

  const { data: dataByStripeId } = useAllPurchasesByStripeIdQuery({
    skip: !stripeId,
    errorPolicy: 'ignore',
    variables: { stripeId },
  });

  const { data: dataByBuyerWalletId } = useAllPurchasesByWalletIdQuery({
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
  if (data?.allPurchases?.nodes) {
    const nodes = data.allPurchases.nodes;
    for (let i = 0; i < nodes.length; i++) {
      const node = data.allPurchases.nodes[i];
      if (node) {
        const units: number = Math.round(
          node.transactionsByPurchaseId?.nodes
            .map(n => (n ? parseFloat(n.units) : 0))
            .reduce(
              (accumulator: number, currentValue: number) =>
                accumulator + currentValue,
            ),
        );

        const vintage = node.creditVintageByCreditVintageId;
        const project = vintage?.projectByProjectId;

        if (project && vintage) {
          const projectStakeholders: StakeholderInfo[] = [];
          const landOwnerInfo = getStakeholderInfo(
            'Land Owner',
            project.partyByLandOwnerId,
            vintage.initialDistribution?.[
              'http://regen.network/landOwnerDistribution'
            ],
          );
          if (landOwnerInfo) {
            projectStakeholders.push(landOwnerInfo);
          }
          const landStewardInfo = getStakeholderInfo(
            'Land Steward',
            project.partyByStewardId,
            vintage.initialDistribution?.[
              'http://regen.network/landStewardDistribution'
            ],
          );
          if (landStewardInfo) {
            projectStakeholders.push(landStewardInfo);
          }
          const projectDeveloperInfo = getStakeholderInfo(
            'Project Developer',
            project.partyByDeveloperId,
            vintage.initialDistribution?.[
              'http://regen.network/projectDeveloperDistribution'
            ],
          );
          if (projectDeveloperInfo) {
            projectStakeholders.push(projectDeveloperInfo);
          }

          const tokenizer =
            vintage.walletByTokenizerId?.partiesByWalletId.nodes[0];

          const creditClassVersion =
            vintage.creditClassVersionByCreditClassVersionIdAndCreditClassVersionCreatedAt;
          const methodologyVersion =
            vintage.methodologyVersionByMethodologyVersionIdAndMethodologyVersionCreatedAt;

          items.push(
            <div
              ref={element => {
                if (
                  element &&
                  ref &&
                  ref.current &&
                  ref.current.length < nodes.length
                ) {
                  ref.current.push(element);
                }
              }}
            >
              <Certificate
                background={background}
                creditName={creditClassVersion?.name || ''}
                certificateTitle={
                  creditClassVersion?.metadata?.[
                    'http://regen.network/offsetGenerationMethod'
                  ] || 'Carbon Removal'
                }
                creditUnitName={
                  creditClassVersion?.metadata?.[
                    'http://regen.network/creditDenom'
                  ]
                }
                projectName={project?.metadata?.['schema:name'] || ''}
                creditsUnits={units}
                equivalentTonsCO2={units} // 1 credit <=> 1 ton CO2e
                buyerName={
                  node?.walletByBuyerWalletId?.partiesByWalletId.nodes[0]
                    ?.name || ''
                }
                date={node.createdAt}
                stakeholders={[
                  {
                    companyName: tokenizer?.name || '',
                    personName: 'Gregory Landua',
                    personRole: 'CEO',
                    label: 'Tokenizer',
                  },
                  ...projectStakeholders,
                ]}
                // TODO add retirement info
                // retired={}
              />
            </div>,
          );

          projects.push(
            <ProjectCard
              href={project.handle ? `/projects/${project.handle}` : undefined}
              name={project.metadata?.['schema:name']}
              imgSrc={project.metadata?.['regen:previewPhoto']?.['@value']}
              place={project.metadata?.['schema:location']?.place_name}
              area={
                project.metadata?.['regen:size']?.['qudt:numericValue']?.[
                  '@value'
                ]
              }
              areaUnit={
                qudtUnitMap[
                  project.metadata?.['regen:projectSize']?.['qudt:unit']?.[
                    '@value'
                  ] as qudtUnit
                ]
              }
              purchaseInfo={{
                units,
                vintageId: vintage.id,
                vintageMetadata: vintage.metadata,
                vintagePeriod: getFormattedPeriod(
                  vintage.startDate,
                  vintage.endDate,
                ),
                creditClass: {
                  standard:
                    creditClassVersion?.creditClassById?.standard || false,
                  documentId: creditClassVersion?.documentId,
                  name: creditClassVersion?.name || '',
                  version: creditClassVersion?.version || '',
                  url: creditClassVersion?.metadata?.[
                    'http://schema.org/url'
                  ]?.['@value'],
                },
                methodology: {
                  documentId: methodologyVersion?.documentId,
                  name: methodologyVersion?.name || '',
                  version: methodologyVersion?.version || '',
                  url: methodologyVersion?.metadata?.[
                    'http://schema.org/url'
                  ]?.['@value'],
                },
                projectType: project.type || '',
              }}
            />,
          );
        }
      }
    }
  }

  const currentPurchase = data?.allPurchases?.nodes[current];
  const currentVintage = currentPurchase?.creditVintageByCreditVintageId;
  const currentProject = currentVintage?.projectByProjectId;
  const externalProjectLink =
    currentProject?.metadata?.['regen:externalProjectUrl'];
  const issuer = currentVintage?.partyByIssuerId;
  const retirements =
    currentVintage?.retirementsByCreditVintageId?.nodes?.filter(n =>
      buyerWalletId
        ? n?.walletId === buyerWalletId
        : n?.walletId === currentPurchase?.buyerWalletId,
    );

  return (
    <div className={classes.root}>
      <div className={classes.background}>
        {data?.allPurchases?.nodes && (
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
      {issuer && (
        <div className={classes.issuer}>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            className={classes.issuerInfo}
          >
            {issuer.image && (
              <UserAvatar src={issuer.image} alt={issuer.image} />
            )}
            <Title variant="h4" sx={{ pl: 3 }}>
              View on {issuer.name}
            </Title>
          </Grid>
          {retirements?.map(
            (r, i) =>
              r?.metadata?.['http://schema.org/url'] && (
                <OutlinedButton
                  href={r?.metadata?.['http://schema.org/url']}
                  target="_blank"
                  className={classes.issuanceButton}
                >
                  retirement»
                </OutlinedButton>
              ),
          )}
          {externalProjectLink && (
            <OutlinedButton
              href={externalProjectLink}
              target="_blank"
              className={classes.projectPageButton}
            >
              project page»
            </OutlinedButton>
          )}
        </div>
      )}
      <Grid container className={classes.share} alignItems="flex-end">
        <Grid item xs={12} sm={6}>
          <Title
            variant="h4"
            sx={{ pb: 3.75, textAlign: { xs: 'center', sm: 'inherit' } }}
          >
            Share
          </Title>
          <ShareIcons
            xsSize={theme.spacing(10)}
            url={`${window.location.origin}/buyers`}
          />
        </Grid>
        {data?.allPurchases?.nodes && (
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
      {data?.allPurchases?.nodes && (
        <div className={classes.projects}>
          <Section
            classes={{ title: classes.projectsTitle }}
            title="Projects Supported"
          >
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

function getStakeholderInfo(
  label: string,
  stakeholder?: Maybe<
    { __typename?: 'Party' | undefined } & ProjectPartyFragment
  >,
  distribution: number | undefined = 0,
): StakeholderInfo | null {
  const orgMember =
    stakeholder?.organizationByPartyId?.organizationMembersByOrganizationId
      ?.nodes[0];
  const person = orgMember?.userByMemberId?.partyByPartyId;
  if (distribution > 0) {
    return {
      companyName: stakeholder?.name || '',
      personName: person?.name || '',
      personRole: orgMember?.roles?.join(', ') || '',
      label,
    };
  }
  return null;
}

export { CertificatePage };
