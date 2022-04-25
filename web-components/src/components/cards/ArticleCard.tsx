import React from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';

import MediaCard from './MediaCard';
import OutlinedButton from '../buttons/OutlinedButton';
import PlayIcon from '../icons/PlayIcon';
import { Body } from '../typography';
import { Box } from '@mui/material';

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
}

const useStyles = makeStyles((theme: Theme) => ({
  play: {
    background: theme.palette.primary.main,
    borderRadius: '50%',
    width: theme.spacing(17.5),
    height: theme.spacing(17.5),
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    top: theme.spacing(15.625),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    filter: 'drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.25))',
  },
  icon: {
    width: theme.spacing(8.75),
    height: theme.spacing(8.75),
  },
}));

export default function ArticleCard({
  className,
  name,
  date,
  author,
  imgSrc,
  url,
  type,
  play = false,
}: ArticleCardProps): JSX.Element {
  const styles = useStyles({});
  return (
    <MediaCard
      className={className}
      name={name}
      imgSrc={imgSrc}
      backgroundGradient={false}
      elevation={1}
    >
      {play && (
        <div className={styles.play}>
          <PlayIcon className={styles.icon} />
        </div>
      )}
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
