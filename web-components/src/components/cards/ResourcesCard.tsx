import React from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';

import OutlinedButton from '../buttons/OutlinedButton';
import EyeIcon from '../icons/EyeIcon';
import MediaCard from './MediaCard';
import { parseText } from '../../utils/textParser';
import { Body, Label } from '../typography';
import { Box } from '@mui/material';

export interface ResourcesCardProps {
  image: { publicURL: string };
  title: JSX.Element | string;
  updated?: string;
  description: JSX.Element | string;
  buttonText?: string | null;
  link: string;
  target?: string;
  backgroundGradient?: boolean;
  titleOverwrite?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    border: `1px solid ${theme.palette.grey[100]}`,
  },
}));

export default function ResourcesCard({
  image,
  title,
  updated,
  description,
  buttonText = 'view resource',
  link,
  target = '_blank',
  backgroundGradient = true,
  titleOverwrite = true,
}: ResourcesCardProps): JSX.Element {
  const classes = useStyles();
  return (
    <MediaCard
      className={classes.root}
      name={title}
      imgSrc={image.publicURL}
      borderRadius="10px"
      elevation={1}
      backgroundGradient={backgroundGradient}
      titleOverwrite={titleOverwrite}
    >
      <Box
        sx={{
          px: [5, 5.25],
          pb: [4, 7],
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {updated && (
          <Body size="xs" color="info.main" mt={2}>
            <Label as="span" size="xs">
              Last Updated:{' '}
            </Label>
            {updated}
          </Body>
        )}
        {description && (
          <Body as="div" mt={2}>
            {parseText(description)}
          </Body>
        )}
        <Box
          sx={{
            mt: [6, 8],
            display: 'flex',
            flexGrow: 1,
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
          }}
        >
          <OutlinedButton
            size="small"
            target={target}
            href={link}
            startIcon={<EyeIcon />}
            sx={{ px: [null, 8] }}
          >
            {buttonText}
          </OutlinedButton>
        </Box>
      </Box>
    </MediaCard>
  );
}
