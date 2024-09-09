import { useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Box, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';

import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import Certificate from 'web-components/src/components/certificate/index';
import PrintIcon from 'web-components/src/components/icons/PrintIcon';
import ShareIcons from 'web-components/src/components/icons/ShareIcons';
import { Title } from 'web-components/src/components/typography';
import { LinkComponentType } from 'web-components/src/types/shared/linkComponentType';

import { Link } from 'components/atoms';
import WithLoader from 'components/atoms/WithLoader';

import { getCertificateLabels } from './Certificate.constants';
import { useCertificateStyles } from './Certificate.styles';
import { getCertificateData } from './Certificate.utils';
import { useFetchRetirement } from './hooks/useFetchRetirement';

function CertificatePage(): JSX.Element {
  const { _ } = useLingui();
  const { classes } = useCertificateStyles({
    pageBackground: '/jpg/certificate-header.jpg',
  });
  const theme = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const { certificateId } = useParams();
  const { retirement, isLoadingRetirement } = useFetchRetirement({
    retirementNodeId: certificateId ?? '',
  });

  const certificateData = getCertificateData({ retirement, _ });
  const certificateLabels = useMemo(() => getCertificateLabels(_), [_]);

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
              labels={certificateLabels}
              background="/svg/topology.svg"
              linkComponent={Link as LinkComponentType}
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
            <Trans>Share</Trans>
          </Title>
          <ShareIcons
            xsSize={theme.spacing(10)}
            url={`${window.location.origin}/certificate/${certificateId}`}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <OutlinedButton
            className={classes.printButton}
            onClick={() => window.print()}
          >
            <PrintIcon className={classes.icon} />{' '}
            <Trans>print certificate</Trans>
          </OutlinedButton>
        </Grid>
      </Grid>
    </div>
  );
}

export { CertificatePage };
