import { Box, Grid } from '@mui/material';

import Card from 'web-components/lib/components/cards/Card';
import SmallArrowIcon from 'web-components/lib/components/icons/SmallArrowIcon';
import { Body, Label } from 'web-components/lib/components/typography';
import { Title } from 'web-components/lib/components/typography/Title';
import { Theme } from 'web-components/lib/theme/muiTheme';

import { Link } from 'components/atoms';

import bridgeMobile from 'assets/bridge.svg';
import bridgeDesktop from 'assets/bridge-side.svg';

const links = [
  { label: 'user guide', url: '/' },
  { label: 'how-to videos', url: '/' },
  { label: 'security', url: '/' },
];

export const BridgeInfo = (): JSX.Element => {
  return (
    <Card
      sx={[
        (theme: Theme) => ({
          display: 'flex',
          width: '100%',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          p: { xs: 5, sm: 8, md: 12 },
          borderRadius: '10px',
          borderColor: 'grey.100',
          minHeight: theme.spacing(61.2),
          backgroundColor: 'info.light',
          backgroundImage: {
            xs: `url(${bridgeMobile})`,
            lg: `url(${bridgeDesktop})`,
          },
          backgroundPosition: { xs: 'bottom', sm: 'right bottom', lg: 'right' },
          backgroundRepeat: 'no-repeat',
        }),
      ]}
    >
      <Grid container spacing={16}>
        <Grid item xs={12} sm={9} md={7} lg={5}>
          <Title variant="h5" sx={{ mb: 4, mt: { xs: 2 } }}>
            Bridging ecocredits
          </Title>
          <Body
            size="lg"
            sx={{ pr: { xs: 0, lg: 12.5 }, mb: { xs: 4, md: 6, lg: 0 } }}
          >
            Move your assets easily to another chain using our cross-chain
            bridge service.
          </Body>
        </Grid>
        <Grid
          item
          xs={12}
          sm={9}
          md={7}
          lg={5}
          sx={{ pt: { xs: '20px !important' } }}
        >
          <Box
            sx={{
              display: 'flex',
              height: '100%',
              flexDirection: 'column',
              justifyContent: 'flex-end',
            }}
          >
            <Grid container spacing={4}>
              {links.map(link => (
                <Grid item xs={6} key={link.label}>
                  <Link sx={{ color: 'secondary.main' }} href={link.url}>
                    <Label size="xs">
                      {link.label}
                      <SmallArrowIcon
                        sx={{
                          mb: 0.3,
                          height: 7,
                          width: 11,
                          ml: 2,
                          display: 'inline',
                        }}
                      />
                    </Label>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={2}
          sx={theme => ({ minHeight: { xs: theme.spacing(61.2), lg: 'auto' } })}
        />
      </Grid>
    </Card>
  );
};
