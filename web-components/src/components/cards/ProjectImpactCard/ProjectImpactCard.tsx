import { Box, Grid, SxProps, Theme } from '@mui/material';
import { IS_REGEN } from 'lib/env';

import { ImageType } from '../../../types/shared/imageType';
import { sxToArray } from '../../../utils/mui/sxToArray';
import SvgColorOverride from '../../icons/utils/SvgColorOverride';
import { Image } from '../../image';
import { Body, Label, Title } from '../../typography';
import Card from '../Card';
import { useProjectImpactCardStyles } from './ProjectImpactCard.styles';

export interface ProjectImpactCardProps {
  className?: string;
  name?: string | null;
  description?: JSX.Element | string;
  imgSrc: string;
  sdgs?: ImageType[];
  label: string;
  standard?: string;
  apiServerUrl?: string;
  imageStorageBaseUrl?: string;
  labelSx?: SxProps<Theme>;
}

export default function ProjectImpactCard({
  name,
  description,
  imgSrc,
  sdgs = [],
  label,
  className,
  standard,
  imageStorageBaseUrl,
  apiServerUrl,
  labelSx,
}: ProjectImpactCardProps): JSX.Element {
  const hasSdgs = sdgs.length > 0;
  const { classes } = useProjectImpactCardStyles();
  return (
    <Card
      className={className}
      borderRadius="10px"
      borderColor="grey.100"
      sx={{
        p: { xs: 2, sm: 2.5 },
        pr: { xs: 3.75, sm: 5 },
      }}
    >
      <Grid container wrap="nowrap">
        <Grid item>
          <Box
            sx={{
              backgroundImage: `url(${imgSrc})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              textAlign: 'left',
              position: 'relative',
              height: [120, 149],
              width: [120, 149],
              borderRadius: '8px',
            }}
          >
            <Label
              size="xxs"
              mobileSize="xxs"
              sx={[
                {
                  position: 'absolute',
                  top: [15, 25],
                  left: 0,
                  width: 'fit-content',
                  borderRadius: '0px 2px 2px 0px',
                  p: 1.25,
                  pl: 2.5,
                },
                ...sxToArray(labelSx),
              ]}
              className="text-sc-tag-prefinance-text-icon bg-sc-tag-impact-background"
            >
              {label}
            </Label>
          </Box>
        </Grid>
        <Grid item pl={[3.75, 5]}>
          <Title
            variant="h6"
            mobileVariant="textSmall"
            pt={[1, 1.25]}
            pb={[2, 2.5]}
          >
            {name}
          </Title>
          {description && (
            <Body as="div" size="sm" mobileSize="sm" sx={{ pb: 4 }}>
              {description}
            </Body>
          )}
          <Box>
            {hasSdgs && (
              <Grid container spacing={2.5} sx={{ mb: 3.125, mt: -2.5 }}>
                {sdgs.map(sdg => (
                  <Grid key={sdg.src} item>
                    {IS_REGEN ? (
                      <Box
                        component="img"
                        sx={{
                          width: { xs: 50, sm: 60 },
                          height: { xs: 50, sm: 60 },
                        }}
                        src={sdg.src}
                        alt={sdg.alt}
                      />
                    ) : (
                      <SvgColorOverride
                        src={sdg.src}
                        color="rgba(var(--ac-neutral-500) / 1)"
                        filterIntensity={6}
                        sx={{
                          width: { xs: 50, sm: 60 },
                          height: { xs: 50, sm: 60 },
                        }}
                      />
                    )}
                  </Grid>
                ))}
              </Grid>
            )}
            {standard && (
              <Box
                sx={{
                  my: [2],
                  height: 42,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Image
                  src={standard}
                  alt={standard}
                  imageStorageBaseUrl={imageStorageBaseUrl}
                  apiServerUrl={apiServerUrl}
                  width={158}
                  className={classes.image}
                />
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}
