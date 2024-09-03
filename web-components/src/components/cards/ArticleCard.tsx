import { Box } from '@mui/material';

import { PlayButton } from '../atoms/PlayButton/PlayButton';
import OutlinedButton from '../buttons/OutlinedButton';
import { Body } from '../typography';
import MediaCard from './MediaCard/MediaCard';

function getBtnText(type?: string | null): string {
  switch (type) {
    case 'video':
      return 'watch video';
    case 'article':
      return 'read article';
    case 'podcast':
      return 'listen to podcast';
    default:
      return 'read article';
  }
}

export interface ArticleCardProps {
  type: string;
  name: string;
  date: string;
  author: string;
  imgSrc: string;
  url: string;
  className?: string;
  play?: boolean;
  draftText: string;
}

export default function ArticleCard({
  className,
  name,
  date,
  author,
  imgSrc,
  url,
  type,
  play = false,
  draftText,
}: ArticleCardProps): JSX.Element {
  return (
    <MediaCard
      className={className}
      name={name}
      imgSrc={imgSrc}
      backgroundGradient={false}
      elevation={1}
      draftText={draftText}
    >
      {play && <PlayButton />}
      <Body size="sm" sx={{ flex: '1 0 auto', py: [2.5, 2], px: [4, 5] }}>
        <Box component="span" sx={{ fontWeight: 'bold' }}>
          {author}
        </Box>
        <Box component="span" sx={{ fontWeight: 100 }}>
          &nbsp;&nbsp;|&nbsp;&nbsp;
        </Box>
        <span>{date}</span>
      </Body>
      <OutlinedButton
        size="small"
        href={url}
        target="_blank"
        sx={{
          maxWidth: 200,
          mt: 4,
          mb: 7.5,
          mx: [4, 5],
        }}
      >
        {getBtnText(type)}
      </OutlinedButton>
    </MediaCard>
  );
}
