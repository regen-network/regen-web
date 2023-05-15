import LazyLoad from 'react-lazyload';
import { Box, SxProps, useTheme } from '@mui/material';

import GithubIcon from 'web-components/lib/components/icons/social/GithubIcon';
import LinkedInIcon from 'web-components/lib/components/icons/social/LinkedInIcon';
import TwitterIcon from 'web-components/lib/components/icons/social/TwitterIcon';
import { Label, Title } from 'web-components/lib/components/typography';
import { Theme } from 'web-components/lib/theme/muiTheme';

import { Hex, Image, ImageWrap, Root } from './TeamSection.styles';

import { RegenTeamMember } from '@/generated/sanity-graphql';

export interface TeamItemProps {
  member: RegenTeamMember;
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
