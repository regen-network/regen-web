import { Box, SxProps, useTheme } from '@mui/material';
import Image from 'next/image';

import GithubIcon from 'web-components/lib/components/icons/social/GithubIcon';
import LinkedInIcon from 'web-components/lib/components/icons/social/LinkedInIcon';
import TwitterIcon from 'web-components/lib/components/icons/social/TwitterIcon';
import { Label, Title } from 'web-components/lib/components/typography';
import { Theme } from 'web-components/lib/theme/muiTheme';

import {
  Hex,
  ImageWrap,
  Root,
  useTeamSectionStyles,
} from './TeamSection.styles';

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
  const { classes } = useTeamSectionStyles();

  return (
    <Root sx={sx}>
      <ImageWrap>
        <Hex sx={{ zIndex: 1 }}>
          <Image
            src={member.image?.asset?.url ?? ''}
            alt={member?.name || 'team member'}
            width={180}
            height={180}
            className={classes.image}
          />
        </Hex>
        <Hex sx={{ zIndex: 0, top: 2, left: 14 }}>
          <Image
            src={bgUrl}
            alt="background"
            width={180}
            height={180}
            className={classes.image}
          />
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
