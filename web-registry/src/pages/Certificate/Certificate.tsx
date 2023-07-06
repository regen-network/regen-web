import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Box, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';

import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import Certificate from 'web-components/lib/components/certificate/index';
import PrintIcon from 'web-components/lib/components/icons/PrintIcon';
import ShareIcons from 'web-components/lib/components/icons/ShareIcons';
import { Title } from 'web-components/lib/components/typography';

import { Link } from 'components/atoms';
import WithLoader from 'components/atoms/WithLoader';

import { useCertificateStyles } from './Certificate.styles';
import { getCertificateData } from './Certificate.utils';
import { useFetchRetirement } from './hooks/useFetchRetirement';

function CertificatePage(): JSX.Element {
  const { classes } = useCertificateStyles({
    pageBackground: '/jpg/certificate-header.jpg',
  });
  const theme = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const { certificateId } = useParams();
  const { retirement, isLoadingRetirement } = useFetchRetirement({
    retirementNodeId: certificateId ?? '',
  });
  const certificateData = getCertificateData({ retirement });

  return (
    <div className={classes.root}>
      <Box
        className={classes.background}
        sx={{ '@media print': { backgroundImage: 'none !important' } }}
      >
        <div className={classes.certificate} ref={ref}>
          <WithLoader
            isLoading={isLoadingRetirement}
            sx={{
              minHeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Certificate
              {...certificateData}
              background="/svg/topology.svg"
              linkComponent={Link}
            />
          </WithLoader>
        </div>
      </Box>
      <Grid
        container
        className={classes.share}
        alignItems="flex-end"
        sx={{ displayPrint: 'none' }}
      >
        <Grid item xs={12} md={6} sx={{ mb: { xs: 0, sm: 2 } }}>
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
        <Grid item xs={12} md={6}>
          <OutlinedButton
            className={classes.printButton}
            onClick={() => window.print()}
          >
            <PrintIcon className={classes.icon} /> print certificate
          </OutlinedButton>
        </Grid>
      </Grid>
    </div>
  );
}

export { CertificatePage };
