import React from 'react';
import LazyLoad from 'react-lazyload';
import { Box, styled, SxProps, useTheme } from '@mui/material';
import GithubIcon from '@regen-network/web-components/lib/components/icons/social/GithubIcon';
import LinkedInIcon from '@regen-network/web-components/lib/components/icons/social/LinkedInIcon';
import TwitterIcon from '@regen-network/web-components/lib/components/icons/social/TwitterIcon';
import {
  Label,
  Title,
} from '@regen-network/web-components/lib/components/typography';
import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';

import { SanityRegenTeamMember } from '../../generated/graphql';

const Root = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const ImageWrap = styled('div')(() => ({
  position: 'relative',
  width: 180,
  height: 180,
}));

const Hex = styled('div')({
  position: 'absolute',
  width: '100%',
  height: '100%',
  clipPath:
    'polygon(47.5% 5.66987%, 48.2899% 5.30154%, 49.13176% 5.07596%, 50% 5%, 50.86824% 5.07596%, 51.7101% 5.30154%, 52.5% 5.66987%, 87.14102% 25.66987%, 87.85495% 26.16978%, 88.47124% 26.78606%, 88.97114% 27.5%, 89.33948% 28.2899%, 89.56505% 29.13176%, 89.64102% 30%, 89.64102% 70%, 89.56505% 70.86824%, 89.33948% 71.7101%, 88.97114% 72.5%, 88.47124% 73.21394%, 87.85495% 73.83022%, 87.14102% 74.33013%, 52.5% 94.33013%, 51.7101% 94.69846%, 50.86824% 94.92404%, 50% 95%, 49.13176% 94.92404%, 48.2899% 94.69846%, 47.5% 94.33013%, 12.85898% 74.33013%, 12.14505% 73.83022%, 11.52876% 73.21394%, 11.02886% 72.5%, 10.66052% 71.7101%, 10.43495% 70.86824%, 10.35898% 70%, 10.35898% 30%, 10.43495% 29.13176%, 10.66052% 28.2899%, 11.02886% 27.5%, 11.52876% 26.78606%, 12.14505% 26.16978%, 12.85898% 25.66987%)',
});

const Image = styled('img')({
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export interface TeamItemProps {
  member: SanityRegenTeamMember;
  bgUrl: string;
  sx?: SxProps<Theme>;
}

export function TeamItem({
  bgUrl,
  member,
  sx = [],
}: TeamItemProps): JSX.Element {
  const theme = useTheme();
  return (
    <Root sx={sx}>
      <ImageWrap>
        <Hex sx={{ zIndex: 1 }}>
          <LazyLoad height={200} offset={100}>
            <Image
              sx={{ transform: 'scale(0.9)' }}
              src={member.image?.asset?.url + `?w=200&q=75&auto=format`}
              alt={member?.name || 'team member'}
            />
          </LazyLoad>
        </Hex>
        <Hex sx={{ zIndex: 0, top: 2, left: 14 }}>
          <Image src={bgUrl} alt="background" />
        </Hex>
      </ImageWrap>

      <Title variant="h4" align="center" sx={{ my: 2 }}>
        {member.name}
      </Title>
      <Label size="xs" sx={{ color: 'info.main', mb: 2.5 }}>
        {member.title}
      </Label>
      <Box sx={{ display: 'flex', gap: 6, justifyContent: 'space-around' }}>
        {member?.githubUrl && (
          <a href={member.githubUrl} target="_blank" rel="noopener noreferrer">
            <GithubIcon color={theme.palette.secondary.main} />
          </a>
        )}
        {member?.twitterUrl && (
          <a href={member.twitterUrl} target="_blank" rel="noopener noreferrer">
            <TwitterIcon color={theme.palette.secondary.main} />
          </a>
        )}
        {member?.linkedinUrl && (
          <a
            href={member.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon color={theme.palette.secondary.main} />
          </a>
        )}
      </Box>
    </Root>
  );
}
