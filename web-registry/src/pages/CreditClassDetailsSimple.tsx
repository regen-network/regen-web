import React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';

import { Theme } from 'web-components/lib/theme/muiTheme';
import {
  BodyText,
  ButtonText,
  Title,
} from 'web-components/lib/components/typography';
import ReadMore from 'web-components/lib/components/read-more';
import SmallArrowIcon from 'web-components/lib/components/icons/SmallArrowIcon';
import { truncate } from 'web-components/lib/utils/truncate';

import { Link } from '../components/atoms';
import { EcocreditsSection, LineItemLabelAbove } from '../components/molecules';
import { CreditBatches, MoreProjectsSection } from '../components/organisms';
import { toTitleCase } from '../lib/titleCase';
import { getAccountUrl } from '../lib/block-explorer';
import { ClassInfo, ApprovedMethodologyList } from '../types/ledger/ecocredit';
import { CreditClassByOnChainIdQuery } from '../generated/graphql';

interface CreditDetailsProps {
  dbClass: CreditClassByOnChainIdQuery['creditClassByOnChainId'];
  onChainClass: ClassInfo;
  metadata?: any;
}

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  sectionPadding: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(30),
      paddingBottom: theme.spacing(30),
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(20),
      paddingBottom: theme.spacing(20),
    },
  },
  topSection: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(12),
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(20),
    },
  },
  label: {
    fontSize: theme.typography.pxToRem(12),
    color: theme.palette.primary.contrastText,
    marginBottom: theme.spacing(3),
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 5,
    border: `1px solid ${theme.palette.grey[100]}`,
    background: theme.palette.primary.main,
    padding: theme.spacing(11, 5),
    margin: theme.spacing(4, 0),
    [theme.breakpoints.up('sm')]: {
      minWidth: theme.spacing(91.75),
    },
  },
  link: {
    color: theme.palette.secondary.main,
    fontWeight: 700,
  },
  description: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(22),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(18),
    },
  },
  marginBottom: {
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(12),
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(8.75),
    },
  },
  sidebarItemMargin: {
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(8.75),
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(8),
    },
    '&:last-child': {
      marginBottom: 0,
    },
  },
  arrow: {
    fontSize: theme.typography.pxToRem(16),
  },
  title: {
    textAlign: 'left',
  },
  textContainer: {
    paddingTop: 0,
  },
}));

const CreditClassDetailsSimple: React.FC<CreditDetailsProps> = ({
  dbClass,
  onChainClass,
  metadata,
}) => {
  const styles = useStyles();

  const Projects: React.FC = () => {
    const projects = dbClass?.projectsByCreditClassId?.nodes;
    if (!projects || projects.length < 1) return null;
    return (
      <div className="topo-background-alternate">
        <MoreProjectsSection
          classes={{ root: styles.sectionPadding, title: styles.title }}
          title="Projects"
          projects={projects}
        />
      </div>
    );
  };

  const ApprovedMethodologies: React.FC<{
    methodologyList: ApprovedMethodologyList;
  }> = ({ methodologyList }) => {
    const methodologies = methodologyList?.['schema:itemListElement'];
    const count = methodologies?.length;
    const firstMethodology = methodologies?.[0];

    if (!count || count < 1) return null;
    return (
      <LineItemLabelAbove
        label="approved methodologies"
        data={
          <Box>
            <BodyText size="xl" key={firstMethodology?.['schema:name']}>
              {firstMethodology?.['schema:name']}
            </BodyText>
            {count > 1 && (
              <Link
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'secondary.main',
                }}
                href={methodologyList?.['schema:url']?.['@value']}
                target="_blank"
              >
                <ButtonText sx={{ fontSize: [16], mr: 2 }}>{`+ ${
                  count - 1
                } more`}</ButtonText>{' '}
                <SmallArrowIcon className={styles.arrow} />
              </Link>
            )}
          </Box>
        }
      />
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'primary.main',
      }}
    >
      <EcocreditsSection classes={{ root: styles.topSection }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              mr: { xs: 0, md: 12 },
            }}
          >
            <Box sx={{ mb: 6 }}>
              <ButtonText size="sm" color="info.dark" mb={4}>
                credit class
              </ButtonText>
              <Title variant="h1">
                {metadata?.['schema:name']} ({onChainClass.class_id})
              </Title>
            </Box>
            {metadata?.['schema:description'] && (
              <ReadMore
                classes={{
                  root: styles.marginBottom,
                  textContainer: styles.textContainer,
                  description: styles.description,
                }}
              >
                {metadata?.['schema:description']}
              </ReadMore>
            )}
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              <LineItemLabelAbove
                label="credit type"
                data={
                  <BodyText size="xl" sx={{ mr: 1 }}>
                    {toTitleCase(onChainClass.credit_type.name)}
                  </BodyText>
                }
              />
              {metadata?.['regen:sourceRegistry']?.['schema:name'] && (
                <LineItemLabelAbove
                  label="registry"
                  data={
                    <Link
                      href={
                        metadata?.['regen:sourceRegistry']?.['schema:url']?.[
                          '@value'
                        ]
                      }
                      target="_blank"
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <BodyText size="xl" sx={{ mr: 1 }}>
                          {metadata?.['regen:sourceRegistry']?.['schema:name']}
                        </BodyText>
                        <SmallArrowIcon
                          sx={{ mt: '-2px' }}
                          className={styles.arrow}
                        />
                      </Box>
                    </Link>
                  }
                />
              )}
              <ApprovedMethodologies
                methodologyList={metadata?.['regen:approvedMethodologies']}
              />
              <LineItemLabelAbove
                label="offset generation method"
                data={metadata?.['regen:offsetGenerationMethod']?.[
                  'schema:itemListElement'
                ]?.map((method: string) => (
                  <BodyText size="xl" key={method}>
                    {toTitleCase(method)}
                  </BodyText>
                ))}
              />
              <LineItemLabelAbove
                label="verification method"
                data={
                  <BodyText size="xl" sx={{ mr: 1 }}>
                    {toTitleCase(metadata?.['regen:verificationMethod'])}
                  </BodyText>
                }
              />
              <LineItemLabelAbove
                label="sectoral scope"
                data={metadata?.['regen:sectoralScope']?.[
                  'schema:itemListElement'
                ]?.map((sector: string) => (
                  <BodyText size="xl" key={sector}>
                    {sector}
                  </BodyText>
                ))}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box className={styles.box}>
              <div className={styles.sidebarItemMargin}>
                <ButtonText size="xs" color="primary.contrastText" mb={3}>
                  admin
                </ButtonText>
                <Link
                  className={styles.link}
                  href={
                    onChainClass.admin
                      ? getAccountUrl(onChainClass.admin)
                      : getAccountUrl(onChainClass?.designer)
                  }
                >
                  {onChainClass.admin
                    ? truncate(onChainClass.admin)
                    : truncate(onChainClass?.designer)}
                </Link>
              </div>
              <div className={styles.sidebarItemMargin}>
                <ButtonText size="xs" color="primary.contrastText" mb={3}>
                  issuers
                </ButtonText>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  {onChainClass?.issuers?.map((issuer: string) => (
                    <Link
                      className={styles.link}
                      href={getAccountUrl(issuer)}
                      target="_blank"
                      key={issuer}
                    >
                      {truncate(issuer)}
                    </Link>
                  ))}
                </Box>
              </div>
            </Box>
          </Box>
        </Box>
      </EcocreditsSection>
      <Projects />
      <div className="topo-background-alternate">
        <CreditBatches
          creditClassId={onChainClass.class_id}
          titleAlign="left"
        />
      </div>
    </Box>
  );
};

export { CreditClassDetailsSimple };
