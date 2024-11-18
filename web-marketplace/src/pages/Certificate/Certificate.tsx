import { useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Box, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';

import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import Certificate from 'web-components/src/components/certificate/index';
import PrintIcon from 'web-components/src/components/icons/PrintIcon';
import ShareIcons from 'web-components/src/components/icons/ShareIcons';
import { Title } from 'web-components/src/components/typography';
import { LinkComponentType } from 'web-components/src/types/shared/linkComponentType';
import { cn } from 'web-components/src/utils/styles/cn';

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
  const { id } = useParams();
  const { retirement, isLoadingRetirement } = useFetchRetirement({
    id: id ?? '',
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
              certificateData={certificateData}
              labels={certificateLabels}
              background="/svg/topology.svg"
              linkComponent={Link as LinkComponentType}
              certificateNotFoundSrc="/svg/certificate-not-found.svg"
              certificateNotFoundAlt={_(msg`certificate not found`)}
              certificateNotFoundTitle={_(
                msg`This certificate has not been generated yet because the credit transfer to you is still pending.`,
              )}
              certificateNotFoundDescription={
                <Trans>
                  If you do not see your certificate within 24 hours, please
                  reach out to{' '}
                  <a href="support@regen.network">support@regen.network</a>.
                </Trans>
              }
            />
          </WithLoader>
        </div>
      </Box>
      {certificateData && (
        <Grid
          container
          className={cn(
            classes.share,
            'flex justify-center min-[675px]:justify-between print:hidden',
          )}
        >
          <Title
            className="w-full text-center sm:text-left"
            variant="h4"
            sx={{ pb: 3.75 }}
          >
            <Trans>Share</Trans>
          </Title>
          <Grid item sx={{ mb: { xs: 0, sm: 2 } }}>
            <ShareIcons
              xsSize={theme.spacing(10)}
              url={`${window.location.origin}/certificate/${id}`}
              copySuccessText={_(msg`Link copied to your clipboard`)}
            />
          </Grid>
          <Grid item className="md:flex md:justify-end">
            <OutlinedButton
              className={cn(classes.printButton, 'ml-auto mt-20 sm:mt-0')}
              onClick={() => window.print()}
            >
              <PrintIcon className={classes.icon} />{' '}
              <Trans>print certificate</Trans>
            </OutlinedButton>
          </Grid>
        </Grid>
      )}
      {!isLoadingRetirement && !certificateData && (
        <div className="pb-40 sm:pb-[100px]" />
      )}
    </div>
  );
}

export { CertificatePage };
