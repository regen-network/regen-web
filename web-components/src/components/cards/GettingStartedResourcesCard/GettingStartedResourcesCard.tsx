import { Box, Grid } from '@mui/material';

import { Theme } from '../../../theme/muiTheme';
import { BlockContent, SanityBlockContent } from '../../block-content';
import SmallArrowIcon from '../../icons/SmallArrowIcon';
import { LinkComponentProp } from '../../modal/ConfirmModal';
import { Body, Label } from '../../typography';
import { Title } from '../../typography/Title';
import Card from '../Card';

export interface GettingStartedResourceCardProps {
  header: string;
  description: SanityBlockContent;
  imageUrl: string;
  mobileImageUrl: string;
  links: {
    buttonText: string;
    buttonHref: string;
    buttonTarget?: string;
  }[];
  linkComponent: LinkComponentProp;
}

export const GettingStartedResourcesCard = ({
  header,
  description,
  imageUrl,
  mobileImageUrl,
  links,
  linkComponent: LinkComponent,
}: GettingStartedResourceCardProps): JSX.Element => {
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
            xs: `url(${mobileImageUrl})`,
            lg: `url(${imageUrl})`,
          },
          backgroundPosition: { xs: 'bottom', sm: 'right bottom', lg: 'right' },
          backgroundRepeat: 'no-repeat',
        }),
      ]}
    >
      <Grid container spacing={16}>
        <Grid item xs={12} sm={9} md={7} lg={5}>
          <Title variant="h5" sx={{ mb: 4, mt: { xs: 2 } }}>
            {header}
          </Title>
          <Body
            size="lg"
            sx={{ pr: { xs: 0, lg: 12.5 }, mb: { xs: 4, md: 6, lg: 0 } }}
          >
            <BlockContent content={description} />
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
              {links.map(({ buttonText, buttonHref, buttonTarget }) => (
                <Grid item key={buttonText}>
                  <LinkComponent
                    sx={{ color: 'secondary.main' }}
                    href={buttonHref}
                    target={buttonTarget}
                  >
                    <Label size="xs">
                      {buttonText}
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
                  </LinkComponent>
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
