import React from 'react';
import SanityImage from 'gatsby-plugin-sanity-image';
import { Box, styled, SxProps, useTheme } from '@mui/material';

import { Label, Title } from 'web-components/lib/components/typography';
import GithubIcon from 'web-components/lib/components/icons/social/GithubIcon';
import TwitterIcon from 'web-components/lib/components/icons/social/TwitterIcon';
import LinkedInIcon from 'web-components/lib/components/icons/social/LinkedInIcon';
import { Theme } from 'web-components/lib/theme/muiTheme';
import { SanityRegenTeamMember } from '../../generated/graphql';

const Root = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const Hexagon = styled('div')({
  position: 'absolute',
  left: '0',
  top: '0',
  width: '100%',
  height: '100%',
  zIndex: 1,
  clipPath:
    'polygon(47.5% 5.66987%, 48.2899% 5.30154%, 49.13176% 5.07596%, 50% 5%, 50.86824% 5.07596%, 51.7101% 5.30154%, 52.5% 5.66987%, 87.14102% 25.66987%, 87.85495% 26.16978%, 88.47124% 26.78606%, 88.97114% 27.5%, 89.33948% 28.2899%, 89.56505% 29.13176%, 89.64102% 30%, 89.64102% 70%, 89.56505% 70.86824%, 89.33948% 71.7101%, 88.97114% 72.5%, 88.47124% 73.21394%, 87.85495% 73.83022%, 87.14102% 74.33013%, 52.5% 94.33013%, 51.7101% 94.69846%, 50.86824% 94.92404%, 50% 95%, 49.13176% 94.92404%, 48.2899% 94.69846%, 47.5% 94.33013%, 12.85898% 74.33013%, 12.14505% 73.83022%, 11.52876% 73.21394%, 11.02886% 72.5%, 10.66052% 71.7101%, 10.43495% 70.86824%, 10.35898% 70%, 10.35898% 30%, 10.43495% 29.13176%, 10.66052% 28.2899%, 11.02886% 27.5%, 11.52876% 26.78606%, 12.14505% 26.16978%, 12.85898% 25.66987%)',
});

const Background = styled('img')({
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const ImageWrap = styled('div')(({ theme }) => ({
  position: 'relative',
  width: theme.spacing(44.75),
  height: theme.spacing(44.75),
}));

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
        <Hexagon sx={{ zIndex: 1 }}>
          <SanityImage
            {...(member.image as any)}
            alt={member.name}
            width={180}
            style={{
              maxWidth: '180px',
              maxHeight: '180px',
              height: '100%',
              objectFit: 'cover',
              objectPosition: '50% 25%',
              transform: 'scale(0.9)',
            }}
          />
        </Hexagon>
        <Hexagon
          sx={{
            zIndex: 0,
            top: 2,
            left: 14,
          }}
        >
          <Background src={bgUrl} alt="background" />
        </Hexagon>
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
