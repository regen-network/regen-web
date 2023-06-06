import { Box } from '@mui/material';
import ReactHtmlParser from 'html-react-parser';

import { headerFontFamily, pxToRem } from '../../theme/muiTheme';
import { LinkComponentType } from '../../types/shared/linkComponentType';
import { LinkType } from '../../types/shared/linkType';
import { pluralize } from '../../utils/pluralize';
import CarbonOffsetBadgeIcon from '../icons/CarbonOffsetBadgeIcon';
import RegenIcon from '../icons/RegenIcon';
import { Body, Subtitle, Title } from '../typography';
import { certificateFormater, certificateOptions } from './certificate.config';
import {
  EQUIVALENT_TO,
  NUMBER_OF_CREDITS,
  RETIREMENT_LOCATION,
  RETIREMENT_REASON,
  TONS_OF_CO2,
  TX_HASH,
} from './certificate.constants';
import { CertificateItem } from './certificate.Item';
import { useCertificateStyles } from './certificate.styles';
import { ItemLink } from './certificate.types';

interface CertificateProps {
  date: string | Date;
  txHash: LinkType;
  certificateTitle: string;
  creditsUnits: number;
  creditUnitName?: string;
  equivalentTonsCO2: number;
  itemLinks: ItemLink[];
  retirementReason?: string;
  retirementLocation?: string;
  background: string;
  linkComponent: LinkComponentType;
}

export default function Certificate({
  date,
  txHash,
  certificateTitle,
  creditsUnits,
  creditUnitName,
  equivalentTonsCO2,
  itemLinks,
  retirementReason,
  retirementLocation,
  background,
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
                {`${TX_HASH}: `}
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
                }}
              >
                <LinkComponent href={txHash.href} sx={{}}>
                  {txHash.text}
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
            <CarbonOffsetBadgeIcon
              sx={{
                fontSize: { xs: 91, sm: 145 },
                '@media print': { fontSize: 75 },
              }}
            />
          </Box>
          <div className={cx(classes.bannerSideRight, classes.bannerSide)}>
            <Box className={classes.whiteTriangle} />
            <div className={classes.greenTriangle} />
          </div>
        </Box>
        <div className={classes.text}>
          <CertificateItem
            name={NUMBER_OF_CREDITS}
            sx={{ mb: { xs: 1.25, sm: 2.5 }, '@media print': { mb: 0 } }}
          >
            <Subtitle
              as="span"
              size="lg"
              mobileSize="md"
              sx={{ '@media print': { fontSize: 9, lineHeight: 0.4 } }}
            >
              {certificateFormater.format(creditsUnits)}{' '}
              {creditUnitName &&
                ReactHtmlParser(pluralize(creditsUnits, creditUnitName))}
            </Subtitle>
          </CertificateItem>
          <CertificateItem
            name={EQUIVALENT_TO}
            sx={{ mb: { xs: 1.25, sm: 2.5 }, '@media print': { mb: 0 } }}
          >
            <Subtitle
              as="span"
              size="lg"
              mobileSize="md"
              sx={{ '@media print': { fontSize: 9, lineHeight: 0.4 } }}
            >
              {certificateFormater.format(equivalentTonsCO2)} {TONS_OF_CO2}
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
            name={RETIREMENT_REASON}
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
            name={RETIREMENT_LOCATION}
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
