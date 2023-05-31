import { useRef } from 'react';
import { Box, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';

import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import Certificate from 'web-components/lib/components/certificate/index';
import PrintIcon from 'web-components/lib/components/icons/PrintIcon';
import ShareIcons from 'web-components/lib/components/icons/ShareIcons';
import { Title } from 'web-components/lib/components/typography';

import { Link } from 'components/atoms';

import { useCertificateStyles } from './Certificate.styles';
import { useFetchCertificate } from './hooks/useFetchCertificate';

function CertificatePage(): JSX.Element {
  const { classes } = useCertificateStyles({
    pageBackground: '/jpg/certificate-header.jpg',
  });
  const theme = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const certificateData = useFetchCertificate({ certificateId: '1' });

  return (
    <div className={classes.root}>
      <Box
        className={classes.background}
        sx={{ '@media print': { backgroundImage: 'none !important' } }}
      >
        <div className={classes.certificate} ref={ref}>
          <Certificate
            {...certificateData}
            background="/svg/topology.svg"
            linkComponent={Link}
          />
        </div>
      </Box>
      <Grid
        container
        className={classes.share}
        alignItems="flex-end"
        sx={{ displayPrint: 'none' }}
      >
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
        <Grid item xs={12} sm={6}>
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
