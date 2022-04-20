import React from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';

import OutlinedButton from '../buttons/OutlinedButton';
import EyeIcon from '../icons/EyeIcon';
import MediaCard from './MediaCard';
import { parseText } from '../../utils/textParser';
import { BodyText, ButtonText } from '../typography';
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
  eyeIcon: {
    height: theme.spacing(3.455),
    marginRight: theme.spacing(1.25),
    marginBottom: theme.spacing(-0.5),
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
          flex: '1 0 auto',
          px: [5, 5.25],
          py: 0,
        }}
      >
        {updated && (
          <BodyText size="xs" color="info.main">
            <ButtonText as="span" size="xs">
              Last Updated:{' '}
            </ButtonText>
            {updated}
          </BodyText>
        )}
        {description && <BodyText mt={2}>{parseText(description)}</BodyText>}
      </Box>
      <Box sx={{ p: [4, 5] }}>
        <OutlinedButton
          size="small"
          target={target}
          href={link}
          sx={{ px: [null, 8] }}
        >
          <EyeIcon className={classes.eyeIcon} />
          <span>{buttonText}</span>
        </OutlinedButton>
      </Box>
    </MediaCard>
  );
}
