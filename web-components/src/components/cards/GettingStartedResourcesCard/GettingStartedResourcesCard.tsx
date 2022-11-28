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
  fullWidth?: boolean;
}

export const GettingStartedResourcesCard = ({
  header,
  description,
  imageUrl,
  mobileImageUrl,
  links,
  linkComponent: LinkComponent,
  fullWidth = false,
}: GettingStartedResourceCardProps): JSX.Element => {
  return (
    <Card
      sx={[
        (theme: Theme) => ({
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
        <Grid
          xs={12}
          lg={8}
          item
          container
          wrap="nowrap"
          flexDirection="column"
        >
          <Grid item>
            <Title variant="h5" sx={{ pb: fullWidth ? 4.25 : 2.5 }}>
              {header}
            </Title>
            <Body
              size="lg"
              sx={{ pb: 5 }}
              // sx={{ pr: { xs: 0, lg: 12.5 }, mb: { xs: 4, md: 6, lg: 0 } }}
            >
              <BlockContent content={description} />
            </Body>
          </Grid>
          <Grid item>
            {/* <Box
            sx={{
              display: 'flex',
              height: '100%',
              flexDirection: 'column',
              justifyContent: 'flex-end',
            }}
          > */}
            {links.map(({ buttonText, buttonHref, buttonTarget }) => (
              <LinkComponent
                sx={{ color: 'secondary.main' }}
                href={buttonHref}
                target={buttonTarget}
              >
                <Label size="xs" sx={{ lineHeight: ['30px'] }}>
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
            ))}
            {/* </Box> */}
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          lg={4}
          sx={theme => ({ minHeight: { xs: theme.spacing(61.2), lg: 'auto' } })}
        />
      </Grid>
    </Card>
  );
};
