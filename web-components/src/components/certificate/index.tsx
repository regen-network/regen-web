import { Box } from '@mui/material';

import { headerFontFamily, pxToRem } from '../../theme/muiTheme';
import { LinkComponentType } from '../../types/shared/linkComponentType';
import { pluralize } from '../../utils/pluralize';
import RegenIcon from '../icons/RegenIcon';
import { Body, Subtitle, Title } from '../typography';
import { certificateFormater, certificateOptions } from './certificate.config';
import { CertificateItem } from './certificate.Item';
import { useCertificateStyles } from './certificate.styles';
import { CertificateType } from './certificate.types';
import { formatCertificateDates } from './certificate.utils';

interface CertificateProps {
  certificateData?: CertificateType;
  background: string;
  labels: Record<string, string>;
  linkComponent: LinkComponentType;
  certificateNotFoundAlt: string;
  certificateNotFoundSrc: string;
  certificateNotFoundTitle: string;
  certificateNotFoundDescription: JSX.Element | string;
}

export default function Certificate({
  certificateData,
  background,
  labels,
  linkComponent: LinkComponent,
  certificateNotFoundAlt,
  certificateNotFoundSrc,
  certificateNotFoundTitle,
  certificateNotFoundDescription,
}: CertificateProps): JSX.Element {
  const { classes, cx } = useCertificateStyles({ background });
  return (
    <Box className={classes.root}>
      <div className={classes.content}>
        {certificateData ? (
          <>
            <Box
              sx={{
                display: 'flex',
                alignItems: { xs: 'flex-start', sm: 'center' },
                justifyContent: 'space-between',
                '@media print': { alignItems: 'flex-start' },
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Body
                  size="sm"
                  sx={{
                    mb: { xs: 0.5, sm: 2 },
                    color: { xs: 'info.main', sm: 'info.dark' },
                    '@media print': {
                      mb: 0.5,
                      color: 'info.main',
                      fontSize: pxToRem(10),
                    },
                  }}
                >
                  {new Date(certificateData.date).toLocaleDateString(
                    'en-US',
                    certificateOptions,
                  )}
                </Body>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { sm: 'center' },
                    '@media print': {
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                    },
                  }}
                >
                  <Box
                    sx={{
                      textTransform: 'uppercase',
                      fontWeight: '800',
                      fontFamily: headerFontFamily,
                      fontSize: pxToRem(10),
                      letterSpacing: 1,
                      color: { xs: 'info.main', sm: 'info.dark' },
                      '@media print': {
                        color: 'info.main',
                        lineHeight: 0.4,
                      },
                      mr: 1,
                    }}
                  >
                    {`${labels.TX_HASH}: `}
                  </Box>
                  <Body
                    size="sm"
                    sx={{
                      textDecoration: 'underline',
                      '& > a.MuiLink-root': {
                        color: { xs: 'info.main', sm: 'info.dark' },
                        '@media print': {
                          color: 'info.main',
                          fontSize: pxToRem(10),
                          lineHeight: 0.4,
                        },
                        fontWeight: 400,
                      },
                      zIndex: 5,
                    }}
                  >
                    <LinkComponent href={certificateData.txHash.href}>
                      {certificateData.txHash.text}
                    </LinkComponent>
                  </Body>
                </Box>
              </Box>
              <RegenIcon className={classes.icon} />
            </Box>
            <Box className={classes.banner} sx={{ position: 'relative' }}>
              <div className={classes.bannerSide}>
                <Box className={classes.whiteTriangle} />
                <div className={classes.greenTriangle} />
              </div>
              <Title
                variant="h3"
                mobileVariant="textSmall"
                className={classes.bannerContent}
                sx={{ '@media print': { fontSize: pxToRem(12) } }}
              >
                {certificateData.certificateTitle}
              </Title>
              <Box
                sx={{
                  position: 'absolute',
                  top: { xs: -76, sm: -120 },
                  zIndex: 1,
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  '@media print': { top: -62 },
                }}
              >
                {certificateData.certificateIcon && (
                  <Box
                    component="img"
                    src={certificateData.certificateIcon}
                    sx={{
                      width: { xs: 91, sm: 145 },
                      height: { xs: 91, sm: 145 },
                      '@media print': { with: 75, height: 75 },
                    }}
                  />
                )}
              </Box>
              <div className={cx(classes.bannerSideRight, classes.bannerSide)}>
                <Box className={classes.whiteTriangle} />
                <div className={classes.greenTriangle} />
              </div>
            </Box>
            <div className={classes.text}>
              {certificateData.equivalentTonsCO2 && (
                <CertificateItem
                  name={labels.EQUIVALENT_TO}
                  sx={{ mb: { xs: 1.25, sm: 2.5 }, '@media print': { mb: 0 } }}
                >
                  <Subtitle
                    as="span"
                    size="lg"
                    mobileSize="md"
                    sx={{ '@media print': { fontSize: 9, lineHeight: 0.4 } }}
                  >
                    {certificateFormater.format(
                      certificateData.equivalentTonsCO2,
                    )}{' '}
                    {`${pluralize(
                      certificateData.equivalentTonsCO2,
                      labels.CREDIT_UNIT,
                    )} ${labels.CREDIT_UNIT_SUFFIX}`}
                  </Subtitle>
                </CertificateItem>
              )}
              <CertificateItem
                name={labels.NUMBER_OF_CREDITS}
                sx={{ mb: { xs: 1.25, sm: 2.5 }, '@media print': { mb: 0 } }}
              >
                <Subtitle
                  as="span"
                  size="lg"
                  mobileSize="md"
                  sx={{ '@media print': { fontSize: 9, lineHeight: 0.4 } }}
                >
                  {certificateFormater.format(certificateData.creditsUnits)}{' '}
                </Subtitle>
              </CertificateItem>
              {certificateData.itemLinks.map(itemLink => (
                <CertificateItem
                  name={itemLink.name}
                  sx={{ mb: { xs: 1.25, sm: 2.5 }, '@media print': { mb: 0 } }}
                  key={itemLink.name}
                >
                  <LinkComponent href={itemLink.link.href}>
                    <Subtitle
                      as="span"
                      size="lg"
                      mobileSize="md"
                      sx={{
                        color: 'secondary.main',
                        '@media print': { fontSize: 9, lineHeight: 0.4 },
                      }}
                    >
                      {itemLink.link.text}
                    </Subtitle>
                  </LinkComponent>
                </CertificateItem>
              ))}
              {certificateData.retirementReason && (
                <CertificateItem
                  name={labels.RETIREMENT_REASON}
                  sx={{ mb: 2.5, '@media print': { mb: 0 } }}
                >
                  <Body
                    sx={{
                      '@media print': { fontSize: 9, lineHeight: 0.8 },
                    }}
                  >
                    {certificateData.retirementReason}
                  </Body>
                </CertificateItem>
              )}
              <CertificateItem
                name={labels.RETIREMENT_LOCATION}
                sx={{ mb: 2.5, '@media print': { mb: 0 } }}
              >
                <Body
                  sx={{
                    '@media print': { fontSize: 9, lineHeight: 0.8 },
                  }}
                >
                  {certificateData.retirementLocation}
                </Body>
              </CertificateItem>
              <CertificateItem
                name={
                  certificateData?.batchStartDates?.length === 1
                    ? labels.CREDIT_BATCH
                    : labels.CREDIT_BATCHES
                }
                sx={{ mb: 2.5, '@media print': { mb: 0 } }}
              >
                <Body
                  className="flex flex-wrap justify-center"
                  sx={{
                    '@media print': { fontSize: 9, lineHeight: 0.8 },
                  }}
                >
                  {certificateData?.batchStartDates?.map((startDate, i) => (
                    <span className="whitespace-nowrap" key={i}>
                      {certificateData?.batchStartDates && i > 0 && (
                        <span className="px-5">&bull;</span>
                      )}
                      {formatCertificateDates(
                        startDate,
                        certificateData?.batchEndDates?.[i],
                      )}
                    </span>
                  ))}
                </Body>
              </CertificateItem>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center max-w-[614px] m-auto py-[100px] sm:py-[250px]">
            <img src={certificateNotFoundSrc} alt={certificateNotFoundAlt} />
            <Title align="center" variant="h4" className="py-10">
              {certificateNotFoundTitle}
            </Title>
            <Body align="center" size="lg">
              {certificateNotFoundDescription}
            </Body>
          </div>
        )}
      </div>
    </Box>
  );
}
