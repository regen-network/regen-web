import React from 'react';
import { Box } from '@mui/material';
import Grid, { GridProps } from '@mui/material/Grid';

import ErrorBanner from 'web-components/src/components/banner/ErrorBanner';
import { Loading } from 'web-components/src/components/loading';
import OnBoardingSection from 'web-components/src/components/section/OnBoardingSection';
import { Body } from 'web-components/src/components/typography';

import { Link } from 'components/atoms';

import {
  CHOOSE_CREDIT_CLASS_DESCRIPTION,
  CHOOSE_CREDIT_CLASS_HREF,
  CHOOSE_CREDIT_CLASS_LINK,
  ERROR_TIMEOUT,
} from './ChooseCreditClass.config';

interface TemplateProps {
  justifyContent?: GridProps['justifyContent'];
  error: string;
  loading?: boolean;
  isIssuer?: boolean;
}

const ChooseCreditClassGrid: React.FC<React.PropsWithChildren<TemplateProps>> =
  ({ justifyContent = 'flex-start', error, loading, isIssuer, children }) => {
    return (
      <Box
        sx={theme => ({
          bgcolor: theme.palette.grey[50],
          borderTop: `1px ${theme.palette.grey[100]} solid`,
        })}
      >
        <OnBoardingSection
          title="Choose a credit class"
          headerChildren={
            isIssuer ? (
              <Body size="lg" as="p" pt={5} textAlign="center">
                {CHOOSE_CREDIT_CLASS_DESCRIPTION}{' '}
                <Link href={CHOOSE_CREDIT_CLASS_HREF}>
                  {CHOOSE_CREDIT_CLASS_LINK}
                </Link>
              </Body>
            ) : undefined
          }
        >
          <Grid
            container
            spacing={4}
            justifyContent={justifyContent}
            sx={theme => ({
              mt: [4.75, 8.5],
              pr: [8, 8, 4],
              maxWidth: theme.spacing(208),
              margin: '0 auto',
            })}
          >
            {loading ? <Loading /> : children}
          </Grid>
          {error && <ErrorBanner text={error} duration={ERROR_TIMEOUT} />}
        </OnBoardingSection>
      </Box>
    );
  };

export { ChooseCreditClassGrid };
