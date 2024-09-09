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

interface CertificateProps extends CertificateType {
  background: string;
  labels: Record<string, string>;
  linkComponent: LinkComponentType;
}

export default function Certificate({
  date,
  txHash,
  certificateTitle,
  certificateIcon,
  creditsUnits,
  equivalentTonsCO2,
  itemLinks,
  retirementReason,
  retirementLocation,
  background,
  labels,
  linkComponent: LinkComponent,
}: CertificateProps): JSX.Element {
  const { classes, cx } = useCertificateStyles({ background });

  return (
    <Box className={classes.root}>
      <div className={classes.content}>
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
              {new Date(date).toLocaleDateString('en-US', certificateOptions)}
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
                <LinkComponent href={txHash.href}>{txHash.text}</LinkComponent>
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
            {certificateTitle}
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
            {certificateIcon && (
              <Box
                component="img"
                src={certificateIcon}
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
          {equivalentTonsCO2 && (
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
                {certificateFormater.format(equivalentTonsCO2)}{' '}
                {`${pluralize(equivalentTonsCO2, labels.CREDIT_UNIT)} ${
                  labels.CREDIT_UNIT_SUFFIX
                }`}
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
              {certificateFormater.format(creditsUnits)}{' '}
            </Subtitle>
          </CertificateItem>
          {itemLinks.map(itemLink => (
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
          <CertificateItem
            name={labels.RETIREMENT_REASON}
            sx={{ mb: 2.5, '@media print': { mb: 0 } }}
          >
            <Body
              sx={{
                '@media print': { fontSize: 9, lineHeight: 0.8 },
              }}
            >
              {retirementReason}
            </Body>
          </CertificateItem>
          <CertificateItem
            name={labels.RETIREMENT_LOCATION}
            sx={{ mb: 2.5, '@media print': { mb: 0 } }}
          >
            <Body
              sx={{
                '@media print': { fontSize: 9, lineHeight: 0.8 },
              }}
            >
              {retirementLocation}
            </Body>
          </CertificateItem>
        </div>
      </div>
    </Box>
  );
}
