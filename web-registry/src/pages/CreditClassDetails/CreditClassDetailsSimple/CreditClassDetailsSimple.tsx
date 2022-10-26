import React from 'react';
import Box from '@mui/material/Box';
import { ClassInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { makeStyles } from 'tss-react/mui';

import ReadMore from 'web-components/lib/components/read-more';
import { Label, Title } from 'web-components/lib/components/typography';
import type { Theme } from 'web-components/lib/theme/muiTheme';

import { CreditClassByOnChainIdQuery } from 'generated/graphql';
import { CreditClassMetadataLD } from 'generated/json-ld';
import { getAccountUrl } from 'lib/block-explorer';

import { AccountLink } from 'components/atoms/AccountLink';
import { EcocreditsSection } from 'components/molecules';
import { CreditBatches } from 'components/organisms';

import { AdditionalInfo } from '../CreditClassDetails.AdditionalInfo';
import { MemoizedProjects as Projects } from '../CreditClassDetails.Projects';
import { SideBarBox } from '../CreditClassDetails.SidebarBox';

interface CreditDetailsProps {
  dbClass?: CreditClassByOnChainIdQuery['creditClassByOnChainId'];
  onChainClass: ClassInfo;
  issuers?: string[];
  metadata?: CreditClassMetadataLD;
}

const useStyles = makeStyles()((theme: Theme) => ({
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

const CreditClassDetailsSimple: React.FC<
  React.PropsWithChildren<CreditDetailsProps>
> = ({ dbClass, onChainClass, issuers, metadata }) => {
  const { classes: styles } = useStyles();

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
              <Label size="sm" color="info.dark" mb={4}>
                credit class
              </Label>
              <Title variant="h1">
                {metadata?.['schema:name']} ({onChainClass.id})
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
            <AdditionalInfo onChainClass={onChainClass} metadata={metadata} />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <SideBarBox>
              <div className={styles.sidebarItemMargin}>
                <Label size="xs" color="primary.contrastText" mb={3}>
                  admin
                </Label>
                <AccountLink
                  className={styles.link}
                  address={onChainClass.admin}
                />
              </div>
              <div className={styles.sidebarItemMargin}>
                <Label size="xs" color="primary.contrastText" mb={3}>
                  issuers
                </Label>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  {issuers?.map((issuer: string) => (
                    <AccountLink
                      key={issuer}
                      address={issuer}
                      className={styles.link}
                      href={getAccountUrl(issuer)}
                    />
                  ))}
                </Box>
              </div>
            </SideBarBox>
          </Box>
        </Box>
      </EcocreditsSection>
      <Projects classId={onChainClass.id} />
      <div className="topo-background-alternate">
        <CreditBatches
          creditClassId={onChainClass.id}
          titleAlign="left"
          withSection
        />
      </div>
    </Box>
  );
};

export { CreditClassDetailsSimple };
