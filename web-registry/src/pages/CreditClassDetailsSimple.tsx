import React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';

import { Theme } from 'web-components/lib/theme/muiTheme';
import Description from 'web-components/lib/components/description';
import Title from 'web-components/lib/components/title';
import { Label } from 'web-components/lib/components/label';
import ReadMore from 'web-components/lib/components/read-more';
import SmallArrowIcon from 'web-components/lib/components/icons/SmallArrowIcon';
import { truncate } from 'web-components/lib/utils/truncate';

import { Link } from '../components/atoms';
import { EcocreditsSection } from '../components/molecules';
import { CreditBatches, MoreProjectsSection } from '../components/organisms';
import { toTitleCase } from '../lib/titleCase';
import { getAccountUrl } from '../lib/block-explorer';
import { ClassInfo, ApprovedMethodologyList } from '../types/ledger/ecocredit';

interface CreditDetailsProps {
  dbClass: any;
  ledgerClass: ClassInfo;
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
  ledgerClass,
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
      <LineItem
        label="approved methodologies"
        data={
          <Box>
            <Description
              className={styles.description}
              key={firstMethodology?.['schema:name']}
            >
              {firstMethodology?.['schema:name']}
            </Description>
            {count > 1 && (
              <Link
                sx={{ display: 'flex', alignItems: 'center' }}
                href={methodologyList?.['schema:url']?.['@value']}
                target="_blank"
              >
                <Label sx={{ mr: 2 }}>{`+ ${count - 1} more`}</Label>{' '}
                <SmallArrowIcon className={styles.arrow} />
              </Link>
            )}
          </Box>
        }
      />
    );
  };

  interface LineItemProps {
    label: string;
    data: string | JSX.Element;
  }

  const LineItem: React.FC<LineItemProps> = ({ label, data }) => {
    if (!data) return null;
    return (
      <Box
        sx={{
          width: { xs: '100%', sm: '50%' },
          pr: 4,
        }}
        className={styles.marginBottom}
      >
        <Label className={styles.label}>{label}</Label>
        <Description className={styles.description}>{data}</Description>
      </Box>
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
              <Label
                sx={{
                  fontSize: { xs: 12, sm: 14 },
                  color: 'info.dark',
                  mb: 4,
                }}
              >
                credit class
              </Label>
              <Title variant="h1">{ledgerClass.class_id}</Title>
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
              <LineItem
                label="credit type"
                data={toTitleCase(ledgerClass.credit_type.name)}
              />
              {metadata?.['regen:sourceRegistry']?.['schema:name'] && (
                <LineItem
                  label="registry"
                  data={
                    <Link
                      href={
                        metadata?.['regen:sourceRegistry']?.['schema:url']
                          ?.value
                      }
                      target="_blank"
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Description
                          sx={{ mr: 1 }}
                          className={styles.description}
                        >
                          {metadata?.['regen:sourceRegistry']?.['schema:name']}
                        </Description>
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
              <LineItem
                label="offset generation method"
                data={metadata?.['regen:offsetGenerationMethod']?.[
                  'schema:itemListElement'
                ]?.map((method: string) => (
                  <Description className={styles.description} key={method}>
                    {toTitleCase(method)}
                  </Description>
                ))}
              />
              <LineItem
                label="verification method"
                data={toTitleCase(metadata?.['regen:verificationMethod'])}
              />
              <LineItem
                label="sectoral scope"
                data={metadata?.['regen:sectoralScope']?.[
                  'schema:itemListElement'
                ]?.map((sector: string) => (
                  <Description className={styles.description} key={sector}>
                    {sector}
                  </Description>
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
                <Label className={styles.label}>admin</Label>
                <Link
                  className={styles.link}
                  href={
                    ledgerClass.admin
                      ? getAccountUrl(ledgerClass.admin)
                      : getAccountUrl(ledgerClass?.designer)
                  }
                >
                  {ledgerClass.admin
                    ? truncate(ledgerClass.admin)
                    : truncate(ledgerClass?.designer)}
                </Link>
              </div>
              <div className={styles.sidebarItemMargin}>
                <Label className={styles.label}>issuers</Label>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  {ledgerClass?.issuers?.map((issuer: string) => (
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
        <CreditBatches creditClassId={ledgerClass.class_id} titleAlign="left" />
      </div>
    </Box>
  );
};

export { CreditClassDetailsSimple };
