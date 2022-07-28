import React from 'react';
import { Box } from '@mui/material';
import Grid, { GridProps } from '@mui/material/Grid';

import ErrorBanner from 'web-components/lib/components/banner/ErrorBanner';
import { Loading } from 'web-components/lib/components/loading';
import OnBoardingSection from 'web-components/lib/components/section/OnBoardingSection';

import { ERROR_TIMEOUT } from './ChooseCreditClass.config';

interface TemplateProps {
  justifyContent?: GridProps['justifyContent'];
  error: string;
  loading?: boolean;
}

const ChooseCreditClassGrid: React.FC<TemplateProps> = ({
  justifyContent = 'flex-start',
  error,
  loading,
  children,
}) => {
  return (
    <Box
      sx={theme => ({
        bgcolor: theme.palette.grey[50],
        borderTop: `1px ${theme.palette.grey[100]} solid`,
      })}
    >
      <OnBoardingSection title="Choose a credit class">
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
