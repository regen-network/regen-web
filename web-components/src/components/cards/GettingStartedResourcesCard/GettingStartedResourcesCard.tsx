import { Grid, useMediaQuery, useTheme } from '@mui/material';

import { Theme } from '../../../theme/muiTheme';
import { BlockContent, SanityBlockContent } from '../../block-content';
import SmallArrowIcon from '../../icons/SmallArrowIcon';
import { LinkComponentProp } from '../../modal/ConfirmModal';
import { Body, Label } from '../../typography';
import { Title } from '../../typography/Title';
import Card from '../Card';

export interface GettingStartedResourceCardProps {
  header?: string | null;
  description: SanityBlockContent;
  imageUrl: string;
  mobileImageUrl: string;
  links: {
    buttonText?: string | null;
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const row = fullWidth && !isMobile;

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
          lg={9}
          item
          container
          wrap="nowrap"
          flexDirection={row ? 'row' : 'column'}
        >
          <Grid item sx={{ width: row ? '50%' : '100%' }}>
            <Title
              variant={fullWidth ? 'h5' : 'h4'}
              sx={{ pb: fullWidth ? 4.25 : 2.5 }}
            >
              {header}
            </Title>
            <Body size="lg" sx={{ pb: 5 }}>
              <BlockContent content={description} />
            </Body>
          </Grid>
          <Grid item sx={{ pt: row ? 12.5 : 0, pl: row ? 17.5 : 0 }}>
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
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          lg={3}
          sx={theme => ({ minHeight: { xs: theme.spacing(61.2), lg: 'auto' } })}
        />
      </Grid>
    </Card>
  );
};
