import { Box } from '@mui/material';

import { PlayPauseButton } from '../../atoms/PlayPauseButton/PlayPauseButton';
import OutlinedButton from '../../buttons/OutlinedButton';
import { Body } from '../../typography';
import MediaCard from '../MediaCard/MediaCard';
import { ArticleType } from './ArticleCard.types';

function getBtnText(
  type: ArticleType,
  btnTextMapping: Record<ArticleType, string>,
): string {
  switch (type) {
    case 'video':
      return btnTextMapping['video'];
    case 'article':
      return btnTextMapping['article'];
    case 'podcast':
      return btnTextMapping['podcast'];
    default:
      return btnTextMapping['article'];
  }
}

export interface ArticleCardProps {
  type: ArticleType;
  name: string;
  date: string;
  author: string;
  imgSrc: string;
  url: string;
  className?: string;
  play?: boolean;
  draftText: string;
  btnTextMapping: Record<ArticleType, string>;
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
  btnTextMapping,
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
      {play && <PlayPauseButton paused={false} />}
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
        {getBtnText(type, btnTextMapping)}
      </OutlinedButton>
    </MediaCard>
  );
}
